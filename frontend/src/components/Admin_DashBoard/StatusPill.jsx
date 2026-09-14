function StatusPill({ status, labels }) {
  return <span className={`cs-form-note ${status}`}>{labels[status] || status}</span>;
}

export default StatusPill;
