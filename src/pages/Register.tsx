import React, {useState, useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import { apiBaseUrl } from '../utils/api'
import axios from 'axios'
import Loading from '../components/Loading'

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => setPageLoading(false), 500);
    })

    const handleRegister = async () => {
      setLoading(true);
        try {
            await axios.post(`${apiBaseUrl}/register`, {userName, email, password})
            navigate('/login')
        } catch (error) {
          setError("Registration failed. Please try again")
        }
    }


    if (pageLoading){
      return (
        <div className="h-screen flex justify-center items-center bg-white">
        <Loading /> 
      </div>
      )
    }



      return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600">Create an Account</h1>
        <p className="text-sm text-gray-500 text-center mt-1">Join us and start your journey!</p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Full Name"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full mt-3 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mt-3 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mt-3 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={handleRegister}
            className="btn btn-primary w-full mt-5 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-all"
          >

            {loading ? <Loading/> : "Sign Up"}
          </button>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register