export default function FormField({ id, label, icon, error, afterControl, children }) {
  return (
    <div className={`field${error ? " error" : ""}`}>
      <label htmlFor={id}>{label}</label>

      <div className="field__control">
        <span className="field__icon">
          <i className={icon}></i>
        </span>

        {children}
      </div>

      {afterControl}

      <small className="field__error">{error}</small>
    </div>
  );
}
