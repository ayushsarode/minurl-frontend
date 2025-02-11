import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const { short } = useParams(); // Get the `:short` parameter from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        // Make a GET request to the backend to fetch the original URL
        const response = await axios.get(`http://localhost:8080/${short}`);
        const originalUrl = response.data.original;

        // Redirect the user to the original URL
        window.location.href = originalUrl;
      } catch (error) {
        console.error("Error fetching original URL:", error);
        navigate("/not-found"); // Redirect to a 404 page if the short URL is invalid
      }
    };

    fetchOriginalUrl();
  }, [short, navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;