import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Events from "./Events";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken("");
  };

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "50px auto" }}>
      {!token ? (
        <>
          {showSignup ? (
            <>
              <Signup setToken={setToken} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowSignup(false)}>Login</button>
              </p>
            </>
          ) : (
            <>
              <Login setToken={setToken} />
              <p>
                Don’t have an account?{" "}
                <button onClick={() => setShowSignup(true)}>Signup</button>
              </p>
            </>
          )}
        </>
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
