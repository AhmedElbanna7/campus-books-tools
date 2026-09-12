export default function SubmitButton({ loading, children }) {
  return (
    <button type="submit" className={`auth-btn-submit${loading ? " loading" : ""}`} disabled={loading}>
      <span>{children}</span>
      <i></i>
    </button>
  );
}
