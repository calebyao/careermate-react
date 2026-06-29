import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

// Register 页面:Name + Email + Password + Confirm Password + Register 按钮
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // 路由跳转

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={(e) => e.preventDefault()}>
        {/* 标题 */}
        <h1 className="register-title">CareerMate Register</h1>
        <p className="register-subtitle">Create your account to get started.</p>

        {/* Name */}
        <div className="register-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="register-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="register-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="register-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Register 按钮 */}
        <button type="submit" className="register-btn">
          Register
        </button>

        {/* 返回登录:点击跳转到 / */}
        <p className="register-footer">
          Already have an account?{" "}
          <span className="link-text" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
