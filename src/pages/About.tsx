import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-white min-h-screen p-8 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">About Our URL Shortener</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We provide a reliable, secure, and easy-to-use URL shortening service that helps businesses and individuals share links effectively across digital platforms. Our mission is to simplify link sharing while providing valuable analytics and insights.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2023, our team of passionate developers and marketers came together with a common goal: to create a URL shortening service that offers more than just shorter links. We believe in the power of data-driven decisions, which is why our platform provides comprehensive analytics to help you understand your audience better.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Fast & Reliable</h3>
              <p className="text-gray-600">Our service ensures quick link generation and reliable redirection with 99.9% uptime.</p>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Security First</h3>
              <p className="text-gray-600">We prioritize the security of your links with advanced encryption and protection against malicious use.</p>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Detailed Analytics</h3>
              <p className="text-gray-600">Gain valuable insights with comprehensive click tracking, geographic data, and referrer information.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Technology</h2>
          <p className="text-gray-600 mb-6">
            Built on modern web technologies, our platform uses React for the frontend and a robust Node.js backend to ensure fast, reliable performance. We utilize advanced database optimization techniques to handle millions of redirects daily without compromising on speed.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Privacy Commitment</h2>
          <p className="text-gray-600">
            We're committed to protecting your data and respecting your privacy. Our service complies with global data protection regulations, and we never sell your personal information to third parties. You can learn more about our data practices in our Privacy Policy.
          </p>
        </div>
        
        <div className="bg-blue-50 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Join Thousands of Satisfied Users</h2>
          <p className="text-gray-600 mb-4">
            From individual content creators to Fortune 500 companies, our URL shortener service helps users of all sizes achieve their link-sharing goals.
          </p>
          <a href="/pricing" className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
            View Our Plans
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;