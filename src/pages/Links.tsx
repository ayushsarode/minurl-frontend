import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils/api";
import { useAuthStore } from "../store/authStore";
import { useURLStore } from "../store/urlStore";
import Nav from "../components/Dashboard/Nav";
import { Copy, MoreVertical, Check, ExternalLink } from "lucide-react";

const URLList: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const {
    urls,
    loading,
    error,
    showQR,
    copied,
    dropdown,
    fetchUrls,
    setShowQR,
    setCopied,
    setDropdown,
    deleteUrl,
  } = useURLStore();

  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 5;

  useEffect(() => {
    fetchUrls(token);
  }, [token, fetchUrls]);

  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl);
  const totalPages = Math.ceil(urls.length / urlsPerPage);

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`${apiBaseUrl}/${shortUrl}`);
    setCopied(shortUrl);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (shortCode: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this URL?"
    );
    if (!confirmed) return;

    await deleteUrl(shortCode, token);
  };

  const handleDownloadQR = (shortCode: string) => {
    const link = document.createElement("a");
    link.href = `${apiBaseUrl}/qr/${shortCode}`;
    link.download = `qr-${shortCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleQR = (shortCode: string) => {
    setShowQR(showQR === shortCode ? null : shortCode);
  };

  const handleToggleDropdown = (shortCode: string) => {
    setDropdown(dropdown === shortCode ? null : shortCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ml-[27.5rem]">
        {loading ? (
          <div className="flex justify-center min-h-[calc(100vh-15rem)] items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative">
            Error: {error}
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Shortened URLs</h2>
            {urls.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">No URLs found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentUrls.map((url) => (
                  <div key={url.id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <p className="font-medium flex gap-2 items-center">
                          Short URL:{" "}
                          <a
                            href={`${apiBaseUrl}/${url.short}`}
                            className="text-blue-500 hover:text-blue-600 gap-2 hover:underline text-md flex transition duration-200 items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.short} <ExternalLink size={18} />
                          </a>
                        </p>
                        <p className="text-gray-600">
                          Original: {url.original}
                        </p>
                        <p className="text-sm text-gray-500">
                          Clicks: {url.clicks}
                        </p>
                        <p className="text-sm text-gray-500">
          Created: {new Date(url.createdAt).toLocaleDateString()}
        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(url.short)}
                          className="px-2 py-2 cursor-pointer text-black hover:bg-gray-200 hover:rounded-full rounded-full transition duration-200 flex items-center gap-1"
                        >
                          {copied === url.short ? (
                            <Check className="text-black" />
                          ) : (
                            <Copy />
                          )}
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => handleToggleDropdown(url.short)}
                            className="px-2 py-2 text-black hover:bg-gray-200 hover:rounded-full rounded-full transition duration-200 flex items-center gap-1"
                          >
                            <MoreVertical />
                          </button>
                          {dropdown === url.short && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden z-10">
                              <button
                                onClick={() => handleToggleQR(url.short)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {showQR === url.short ? "Hide QR" : "Show QR"}
                              </button>
                              <button
                                onClick={() => handleDownloadQR(url.short)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Download QR
                              </button>
                              <button
                                onClick={() => handleDelete(url.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {showQR === url.short && (
                      <div className="mt-4 flex justify-center">
                        <img
                          src={`${apiBaseUrl}/qr/${url.short}`}
                          alt={`QR Code for ${url.short}`}
                          className="w-64 h-64"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white border rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default URLList;
