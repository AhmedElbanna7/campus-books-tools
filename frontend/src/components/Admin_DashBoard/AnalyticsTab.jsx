import StatCard from "./StatCard";

function AnalyticsTab({ stats, loading }) {
  if (loading) {
    return <p className="cs-empty">Loading stats…</p>;
  }

  if (!stats) {
    return <p className="cs-empty">Couldn't load stats.</p>;
  }

  return (
    <section className="cs-stats-grid">
      <StatCard label="Total Users" value={stats.Users} />
      <StatCard label="Blocked Users" value={stats.Blocked} />
      <StatCard label="Total Listings" value={stats.Listings} />
      <StatCard label="Available" value={stats.Available} />
      <StatCard label="Borrowed" value={stats.Borrowed} />
      <StatCard label="Sold" value={stats.Sold} />
    </section>
  );
}

export default AnalyticsTab;
