import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuperUser } from "../../Features/SuperUserLogin/login";
import "./Login.css";
import hero from "../../Assests/hero.png";
import { toast } from "react-toastify";

const Login = ({openRegister, closeModal}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the login state from Redux
  const { isLoggedIn, error, superUsertoken, loading } = useSelector(
    (state) => state.login
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setLocalError(""); // Clear local errors
      dispatch(loginSuperUser({ email, password }));
    } else {
      setLocalError("Please fill in both fields");
    }
  };

  // Effect to handle post-login actions
  useEffect(() => {
    if (isLoggedIn) {
      toast.success("User logged in!");
      localStorage.setItem("authToken", superUsertoken);
      navigate("/employeeDetail");
    }
    if (error) {
      toast.error(error);   // Show as a toast notification
    }
  }, [isLoggedIn, error, navigate, superUsertoken]);

  const handlePopups = ()=>{
    closeModal();
    openRegister();
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div>
          <img src={hero} alt="" />
        </div>
        <h1>Login</h1>
        {localError && <p className="error-message">{localError}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         <div className="forget-password">
            <p>Forgot Password</p>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
         
          <div className="register-link">
            <p>Don't have an account?<span onClick={handlePopups}>Register for free</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
