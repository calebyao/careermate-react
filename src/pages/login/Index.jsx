import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";

// Login 页面:标题 + Email 输入框 + Password 输入框 + Login 按钮
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");       // 邮箱错误信息
  const [passwordError, setPasswordError] = useState(""); // 密码错误信息
  const navigate = useNavigate(); // 路由跳转

  // 输入 Email 时即时校验:不能为空、必须含 @、长度 ≤ 50
  function emailChange(e) {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!value.includes("@")) {
      setEmailError("Invalid email format");
    } else if (value.length > 50) {
      setEmailError("Email must be less than 50 characters");
    } else {
      setEmailError("");
    }
  }

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

  // 提交登录(此处仅作演示,真实项目会先校验账号密码再跳转)
  const handleSubmit = (e) => {
    e.preventDefault();
    // 登录成功后跳转到首页
    navigate("/home");
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        {/* 品牌名 */}
        <h2 className="login-brand">CareerMate AI</h2>

        {/* Login 标题 */}
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Welcome back! Please sign in to continue.</p>

        {/* Email 输入框 */}
        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={emailChange}
          />
          {/* 条件渲染:emailError 有值才显示 */}
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        {/* Password 输入框 */}
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={passwordChange}
          />
          {/* 条件渲染:passwordError 有值才显示 */}
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        {/* 实时显示用户输入的内容 */}
        <div className="login-preview">
          <p>Email: {email}</p>
          <p>Password: {password}</p>
        </div>

        {/* Login 按钮 */}
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
