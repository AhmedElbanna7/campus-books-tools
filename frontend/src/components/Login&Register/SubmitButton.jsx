export default function SubmitButton({ loading, children }) {
  return (
    <button type="submit" className={`btn-submit${loading ? " loading" : ""}`} disabled={loading}>
      <span>{children}</span>
      <i></i>
    </button>
  );
}
