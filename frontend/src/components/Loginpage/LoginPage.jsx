import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginPage.css";
import { BlogContext} from "../../context/BlogProvider";
const LoginPage = ({ setContent }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const { url } = useContext(BlogContext);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = data;

    const payload = isSignup
      ? { name: username, email, password }
      : { email, password };

    const endpoint = isSignup ? url + "/register" : url + "/login";

    try {
      const res = await axios.post(endpoint, payload);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setName(res.data.user?.name || username);
        toast.success(`${isSignup ? "Signed up" : "Logged in"} successfully!`);

        // Hide login modal/page
        setTimeout(() => setContent(false), 1000); // 1s delay for smoother UI
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setData({ username: "", email: "", password: "" });
    setName("");
    toast.info("Logged out");
  };

  useEffect(() => {
    console.log("Form Data:", data);
  }, [data]);

  return (
    <div className="login">
      <div className="login-page">
        <h1>{isSignup ? "Sign Up" : "Login Page"}</h1>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={data.username}
                required
                placeholder="Enter your username"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              placeholder="Enter your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
              value={data.password}
              placeholder="Enter your Password"
            />
          </div>

          <div className="form-group form-terms">
            <p className="terms">
              Agree to terms?{" "}
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                required
                style={{ position: "relative", top: "2px" }}
              />
            </p>
          </div>

          {token ? (
            <>
              <p>Welcome, {name}</p>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          )}

          <div className="form-group">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => setIsSignup((prev) => !prev)}
              >
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </div>
        </form>

        <span
          className="close"
          style={{ cursor: "pointer" }}
          onClick={() => setContent((e) => !e)}
        >
          ×
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
