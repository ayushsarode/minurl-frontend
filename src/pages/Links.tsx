import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../utils/api';
import { useAuthStore } from '../store/authStore';
import Nav from '../components/Dashboard/Nav';

// Define the URL interface to match your backend model
interface URL {
  id: string;
  original: string;
  short: string;
  userID: string;
  clicks: number;
}

interface URLResponse {
  urls: URL[];
  count: number;
}

const URLList: React.FC = () => {
  const [urls, setUrls] = useState<URL[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get token from Zustand store - moved outside of useEffect
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        
        // Check if token exists
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get<URLResponse>(`${apiBaseUrl}/urls`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setUrls(response.data.urls);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || 'Failed to fetch URLs');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [token]); // Added token as dependency

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-80">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Error: {error}
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Your Shortened URLs</h2>
            {urls.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">No URLs found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {urls.map((url) => (
                  <div key={url.id} className="bg-white border p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <p className="font-medium">
                          Short URL: <a 
                            href={`${apiBaseUrl}/${url.short}`} 
                            className="text-blue-500 hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {url.short}
                          </a>
                        </p>
                        <p className="text-gray-600">Original: {url.original}</p>
                        <p className="text-sm text-gray-500">Clicks: {url.clicks}</p>
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(`${apiBaseUrl}/${url.short}`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default URLList;