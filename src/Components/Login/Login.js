import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log(username, password);
      console.log(response.status);
      if (response.ok) {
        console.log(response.status);
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        window.location.href = "/profile";
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="bottom">
        <p>given API is not Working</p>
        <p>use this crentials </p>
        <ol>
          <li>username:emilys & password":"emilyspass</li>
          <li>username":"michaelw & password":"michaelwpass</li>
          <li>username:sophiab & password:sophiabpass</li>
        </ol>
      </div>
    </>
  );
};

export default Login;
