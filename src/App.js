import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Index";
import Register from "./pages/register/index";
import Home from "./pages/home/home";

// 路由配置:
//   /login    → 登录页(默认入口)
//   /register → 注册页
//   /home     → 登录成功后的首页
//   其他路径一律重定向到 /login
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
