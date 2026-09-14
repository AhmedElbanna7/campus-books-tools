export default function Checkbox({ id, checked, onChange, children }) {
  return (
    <label className="checkbox">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span></span>
      {children}
    </label>
  );
}
