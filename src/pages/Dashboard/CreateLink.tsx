import Nav from '../../components/Dashboard/Nav'
import axios from 'axios'
import { apiBaseUrl } from '../../utils/api'
import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { ArrowRight, Copy, Link2, Sparkles, Check } from 'lucide-react'

interface ShortenURL {
  original_url: string;
  short_url: string;
}

const CreateLink = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState<ShortenURL | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const token = useAuthStore((state) => state.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalURL) return alert("Please enter a URL");
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}/shorten`,
        { original: originalURL },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShortenedURL(response.data);
      setOriginalURL("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortenedURL) {
      try {
        await navigator.clipboard.writeText(`${apiBaseUrl}/${shortenedURL.short_url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        alert("Failed to copy to clipboard");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Nav />
      
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] ml-[18rem] px-4">
        
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-2xl border border-white/20 w-full max-w-4xl text-center relative overflow-hidden">
          
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-100 rounded-full opacity-30"></div>
          
          {/* Header */}
          <div className="relative z-10 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Link2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Create Short Links
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Transform long URLs into clean, shareable links in seconds
            </p>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="relative z-10 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <input
                  type="url"
                  placeholder="https://example.com/very-long-url..."
                  value={originalURL}
                  onChange={(e) => setOriginalURL(e.target.value)}
                  className="w-full bg-white rounded-xl px-6 py-4 border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
                  required
                  disabled={isLoading}
                />
                {originalURL && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    Create Link
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result Section */}
          <div className="relative z-10 min-h-[80px] flex items-center justify-center">
            {shortenedURL ? (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-inner w-full max-w-2xl mx-auto transform animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Your shortened URL:</p>
                    <a
                      href={`${apiBaseUrl}/${shortenedURL.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 break-all"
                    >
                      {`${apiBaseUrl}/${shortenedURL.short_url}`}
                    </a>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      copied
                        ? 'bg-green-100 text-green-700 border-2 border-green-200'
                        : 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-transparent hover:shadow-md'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 italic">
                Your shortened link will appear here
              </div>
            )}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl">
          <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 border border-white/40">
            ⚡ Instant shortening
          </div>
          <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 border border-white/40">
            🔒 Secure & reliable
          </div>
          <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 border border-white/40">
            📊 Track analytics
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;