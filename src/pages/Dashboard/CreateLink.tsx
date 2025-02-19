import Nav from '../../components/Dashboard/Nav'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/api'
import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { ArrowRight, Copy } from 'lucide-react'

interface ShortenURL {
  original_url: string;
  short_url: string;
}

const CreateLink = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState<ShortenURL | null>(null);
  
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

      setShortenedURL(response.data); // Store only the latest URL
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

  const handleCopy = () => {
    if (shortenedURL) {
      navigator.clipboard.writeText(`${apiBaseUrl}/${shortenedURL.short_url}`);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Nav />
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <div className="bg-white p-20 px-30 rounded-lg shadow-xl w-full max-w-3xl text-center">
          <h2 className="text-3xl font-semibold mb-4">Shorten a URL</h2>
          <p className='text-gray-500'>Create, shorten, and manage your links</p>

          <form onSubmit={handleSubmit} className="flex gap-2  items-center justify-center mt-8">
            <input
              type="url"
              placeholder="Enter URL"
              value={originalURL}
              onChange={(e) => setOriginalURL(e.target.value)}
              className="bg-white rounded-lg p-5 w-[65%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-5 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              Create Link <ArrowRight />
            </button>
          </form>

          {/* Always reserved space for shortened link */}
          <div className="mt-6 h-14 flex items-center justify-center">
            {shortenedURL ? (
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between shadow-md w-lg">
                <a
                  href={`${apiBaseUrl}/${shortenedURL.short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium truncate w-[80%] hover:underline"
                >
                  {`${apiBaseUrl}/${shortenedURL.short_url}`}
                </a>
                <button
                  onClick={handleCopy}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-1"
                >
                  <Copy size={16} /> Copy
                </button>
              </div>
            ) : (
              <div className="h-12 w-full"></div> // Keeps space reserved
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
