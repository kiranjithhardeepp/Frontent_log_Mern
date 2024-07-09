import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Log = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await axios.post(
        "https://backend-log-mern.onrender.com/login",
        {
          username,
          password,
        }
      );
      console.log(res);

      if (res.data.message === "true") {
        toast.success("Credit only");
        setTimeout(() => {
          navigate(`/Credit?username=${username}`);
        }, 2000);
      } else if (res.data.message === "false") {
        toast.success("Debit only");
        setTimeout(() => {
          navigate(`/Debit?username=${username}`);
        }, 2000);
      } else {
        setError("An error occurred. Please try again.");
        toast.error("Error in login");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        toast.error("Error in login");
      } else {
        setError("An error occurred. Please try again.");
        toast.error("Error in login");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Log;
