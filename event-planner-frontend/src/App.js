import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Events from "./Events";

function App() {
  // Use the same key "token" as in login.js
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove stored token
    setToken("");
  };

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "50px auto" }}>
      {!token ? (
        <>
          <Signup />
          <hr />
          <Login onLogin={setToken} /> {/* updated prop to match login.js */}
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Events token={token} /> {/* pass token to Events */}
        </>
      )}
    </div>
  );
}

export default App;