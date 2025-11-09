import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { AuthContext } from "./AuthContext";

function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  const handleLogin = () => {
    const dummyUser = { name: "Dhritiman", email: "dhriti@emai.com" };
    login(dummyUser);
  };

  return (
    <>
      <div
        style={{
          background: theme === "light" ? "#fff" : "#333",
          color: theme === "light" ? "#000" : "#fff",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>React Multi-Context Example</h1>

        <div style={{ margin: "20px" }}>
          <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} Mode
          </button>
        </div>

        {isAuthenticated ? (
          <>
            <h2>Welcome, {user.name} 👋</h2>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
