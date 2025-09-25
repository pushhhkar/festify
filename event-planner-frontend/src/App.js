import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Events from "./Events";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken("");
  };

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "50px auto" }}>
      {!token ? (
        <AuthForm setToken={setToken} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Events token={token} />
        </>
      )}
    </div>
  );
}

export default App;