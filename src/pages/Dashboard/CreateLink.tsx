import Nav from '../../components/Dashboard/Nav'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/api'
import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'


interface ShortenURL {
  original_url: string;
  short_url: string;
}

const CreateLink = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState<ShortenURL[]>([]);
  
  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalURL) return alert("Please enter a URL");

    try {
      const response = await axios.post(
        `${apiBaseUrl}/shorten`,
        { original: originalURL },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShortenedURL((prev) => [...prev, response.data]);
      setOriginalURL(""); // Reset input field

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to shorten URL");
    }
  };

  return (
    <div className='bg-slate-100 h-screen m-0'>
      <Nav />
      <div className="p-4 ml-100">
        <h2 className="text-2xl font-semibold mb-4">Shorten a URL</h2>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            placeholder="Enter URL"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Shorten
          </button>
        </form>

        {shortenedURL.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Shortened URLs</h3>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Original URL</th>
                  <th className="border p-2">Short URL</th>
                </tr>
              </thead>
              <tbody>
                {shortenedURL.map((url, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{url.original_url}</td>
                    <td className="border p-2">
                      <a
                        href={`${apiBaseUrl}/${url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {`${apiBaseUrl}/${url.short_url}`}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLink;
