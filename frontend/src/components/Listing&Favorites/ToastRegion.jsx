function ToastRegion({ toasts }) {
  return (
    <div className="toast-region">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

export default ToastRegion;
