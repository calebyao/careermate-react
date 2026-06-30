import { useState } from "react";

// 自定义 Hook:复用 Email 状态逻辑(value + error + onChange)
// 校验规则:不能为空、必须含 @、长度 ≤ 50
// 修改规则只需改这一个文件,所有使用方同步生效。
export default function useEmail(initialValue = "") {
  const [email, setEmail] = useState(initialValue);
  const [emailError, setEmailError] = useState("");

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

  return { email, emailError, emailChange, setEmail, setEmailError };
}
