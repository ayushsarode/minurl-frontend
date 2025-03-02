import Loading from "../components/Loading"
import Navbar from "../components/Navbar"
import { ArrowRight, QrCode, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 h-screen max-w-7xl mx-auto ">

        
        {/* Left side - Content */}
        <div className="max-w-2xl text-left mb-12 lg:mb-0">
          <p className="text-base font-medium bg-blue-100 inline-block p-1 rounded-full px-4 text-blue-700 my-2">
            Powerful URL shortening made simple 🚀
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
            Shorten links, simplify sharing, and track with ease.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Create memorable, trackable short links in seconds. Perfect for social media, marketing campaigns, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="register"
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base font-semibold px-6 py-3 text-center inline-flex items-center group transition-all duration-200"

            >
              Get started for free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              type="button"
              className="text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-base font-semibold px-6 py-3 text-center"
            >
              See how it works
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <QrCode className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">QR Codes</h3>
                <p className="text-sm text-gray-600">Generate QR codes for every link</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Detailed Analytics</h3>
                <p className="text-sm text-gray-600">Track clicks and visitor data</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="w-full lg:w-5/12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg">
            <div className="relative">
              {/* URL shortening interface mockup */}
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="mb-4">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-10 bg-gray-100 rounded-lg w-full flex items-center px-3">
                    <div className="h-4 w-64 bg-gray-200 rounded"></div>
                    <div className="ml-auto bg-blue-600 h-8 w-20 rounded-md"></div>
                  </div>
                </div>
                <div className="border-t py-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-blue-200 rounded"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-blue-200 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* QR code overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md w-48">
                <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="grid grid-cols-4 gap-1 w-32 h-32 mx-auto">
                  {Array(16).fill().map((_, i) => (
                    <div key={i} className={`bg-gray-900 rounded-sm ${i % 5 === 0 ? 'bg-white' : ''}`}></div>
                  ))}
                </div>
                <div className="h-3 w-20 bg-gray-200 rounded mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home