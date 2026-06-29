import "./TextInput.css";

// 可复用输入框组件
// props:
//   label       - 标签文字
//   value       - 输入值(受控)
//   onChange    - 输入回调
//   type        - input 类型(text / email / password ...),默认 text
//   error       - 错误信息,有值时显示红色提示
//   placeholder - 占位提示(可选)
//   id          - input 的 id,关联 label(可选)
function TextInput({ label, value, onChange, type = "text", error, placeholder, id }) {
  return (
    <div className="text-input">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default TextInput;
