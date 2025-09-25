import React, { useState } from "react";

function AuthForm({ setToken }) {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup
      ? "http://127.0.0.1:8000/api/signup/"
      : "http://127.0.0.1:8000/api/token-auth/";
    const body = isSignup ? { username, email, password } : { username, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        setMessage(isSignup ? "Signup successful!" : "Login successful!");
      } else {
        setMessage(data.message || data.non_field_errors || "Operation failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={toggleForm}>
          Switch to {isSignup ? "Login" : "Signup"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        {isSignup && (
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AuthForm;