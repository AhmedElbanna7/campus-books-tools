function StatCard({ label, value }) {
  return (
    <div className="cs-stat-card">
      <div className="cs-stat-info">
        <label>{label}</label>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default StatCard;
