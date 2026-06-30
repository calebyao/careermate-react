// 集中管理表单校验逻辑。
// 每个函数返回错误信息字符串;校验通过则返回空字符串 ""。
// 规则要改时只需改这一个文件。

// 登录校验:Email 不为空且含 @,Password 不为空且至少 6 位
export function validateLogin(email, password) {
  if (!email.trim()) return "Email is required";
  if (!email.includes("@")) return "Invalid email format";
  if (!password.trim()) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
}

// 注册校验:四项都不能为空;Email 含 @;Password 至少 6 位;两次密码一致
export function validateRegister(name, email, password, confirmPassword) {
  if (!name.trim()) return "Name is required";
  if (!email.trim()) return "Email is required";
  if (!password.trim()) return "Password is required";
  if (!confirmPassword.trim()) return "Confirm Password is required";
  if (!email.includes("@")) return "Invalid email format";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
}
