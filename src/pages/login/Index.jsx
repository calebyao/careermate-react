import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import useEmail from "../../hooks/useEmail";
import "./Index.css";

// 模拟后端登录 API:等待 1 秒,账号密码正确则成功,否则失败
function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@test.com" && password === "123456") {
        resolve();
      } else {
        reject(new Error("Incorrect email or password"));
      }
    }, 1000);
  });
}

// Login 页面:标题 + Email 输入框 + Password 输入框 + Login 按钮
function Login() {
  // Email 状态逻辑复用自定义 Hook
  const { email, emailError, emailChange } = useEmail();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // 密码格式错误

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");       // 登录失败原因
  const navigate = useNavigate();               // 路由跳转

  // 输入 Password 时即时校验:不能为空、至少 6 位、不超过 20 位
  function passwordChange(e) {
    const value = e.target.value;
    setPassword(value);

    if (!value.trim()) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (value.length > 20) {
      setPasswordError("Password must be less than 20 characters");
    } else {
      setPasswordError("");
    }
  }

  // 登录处理:loading → 调用 mockLogin → success / error
  async function handleLogin() {
    setError("");
    setStatus("loading");
    try {
      await mockLogin(email, password);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={(e) => e.preventDefault()}>
        {/* 品牌名 */}
        <h2 className="login-brand">CareerMate AI</h2>

        {/* Login 标题 */}
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Welcome back! Please sign in to continue.</p>

        {/* Email 输入框(复用 TextInput) */}
        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={emailChange}
          error={emailError}
        />

        {/* Password 输入框(复用 TextInput) */}
        <TextInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={passwordChange}
          error={passwordError}
        />

        {/* 实时显示用户输入的内容 */}
        <div className="login-preview">
          <p>Email: {email}</p>
          <p>Password: {password}</p>
        </div>

        {/* Login 按钮:loading 时显示 "Logging in..." */}
        <button
          type="button"
          className="login-btn"
          onClick={handleLogin}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>

        {/* 登录失败消息 */}
        {status === "error" && <p className="error-message">{error}</p>}

        {/* 登录成功消息 */}
        {status === "success" && (
          <p className="success-message">Login Success</p>
        )}

        {/* 去注册:点击跳转到 /register */}
        <p className="login-footer">
          Don't have an account?{" "}
          <span className="link-text" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
