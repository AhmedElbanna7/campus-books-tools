import { useState } from "react";

export default function PasswordInput({ id, value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <input
        type={visible ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      <button
        type="button"
        className="field__toggle"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((prev) => !prev)}
      >
        <i className={`fa-solid ${visible ? "fa-eye-slash" : "fa-eye"}`}></i>
      </button>
    </>
  );
}
