import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import useEmail from "../../hooks/useEmail";
import "./index.css";

// 模拟后端注册 API:等待 1 秒后成功
function mockRegister() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// Register 页面:Name + Email + Password + Confirm Password + Register 按钮
function Register() {
  const [name, setName] = useState("");
  const { email, emailError, emailChange } = useEmail(); // Email 逻辑复用 Hook
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [error, setError] = useState("");       // 校验错误信息
  const navigate = useNavigate(); // 路由跳转

  // 校验输入:返回错误信息,合法则返回空字符串
  function validate() {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!password.trim()) return "Password is required";
    if (!confirmPassword.trim()) return "Confirm Password is required";
    if (!email.includes("@")) return "Invalid email format";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  }

  // 注册处理:先校验,合法才 loading → mockRegister → success → 跳回登录页
  async function handleRegister() {
    const message = validate();
    if (message) {
      setError(message); // 校验失败:显示错误,禁止注册
      return;
    }

    setError("");
    setStatus("loading");
    await mockRegister();
    setStatus("success"); // 显示 "Register success"
    // 稍作停留让用户看到成功提示,然后进入登录页
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={(e) => e.preventDefault()}>
        {/* 标题 */}
        <h1 className="register-title">CareerMate Register</h1>
        <p className="register-subtitle">Create your account to get started.</p>

        {/* Name(复用 TextInput) */}
        <TextInput
          id="name"
          label="Name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email(复用 TextInput + useEmail Hook) */}
        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={emailChange}
          error={emailError}
        />

        {/* Password(复用 TextInput) */}
        <TextInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password(复用 TextInput) */}
        <TextInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Register 按钮:loading 时显示 "Registering..." */}
        <button
          type="button"
          className="register-btn"
          onClick={handleRegister}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>

        {/* 校验错误消息 */}
        {error && <p className="error-message">{error}</p>}

        {/* 注册成功消息 */}
        {status === "success" && (
          <p className="success-message">Register success</p>
        )}

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
