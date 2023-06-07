import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const http = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 - Unauthorized || 403 - Forbidden
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default function AuthUser() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && isValidToken(savedToken)) {
      setToken(savedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const saveToken = (token) => {
    if (isValidToken(token)) {
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/");
    } else {
      console.log("Invalid token");
    }
  };

  const isValidToken = (token) => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;
      }
    }
  };

  http.defaults.headers.common.Authorization = `Bearer ${token}`;

  const logout = () => {
    http
      .post("/logout")
      .then(() => {
        document.cookie =
          "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    setToken: saveToken,
    isValidToken,
    token,
    http,
    logout,
  };
}
