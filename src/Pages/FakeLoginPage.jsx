import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./FakeLoginPage.module.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const FakeLoginPage = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.toLowerCase() === "emil" && password === "password123") {
      setIsLoggedIn(true);
      navigate("/Loggedin");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1>Log in to Luna Link</h1>
        <label className={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
            className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            className={styles.input}
          />
        </label>
        <div className={styles.forgot}>
          <div>
            <p>Forgot Password?</p>
          </div>
          <div>
            <p>Create Account</p>
          </div>
        </div>
        <br />

        <button onClick={handleLogin} className={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

export default FakeLoginPage;
