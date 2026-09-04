import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [tab, setTab] = useState("stats");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/stats").then((res) => setStats(res.data));
    axios.get("http://localhost:5000/api/admin/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:5000/api/admin/listings").then((res) => setListings(res.data));
  }, []);

  const toggleBlockUser = async (id, blocked) => {
    await axios.put(`http://localhost:5000/api/admin/users/${id}`, { blocked: !blocked });
    setUsers(users.map((u) => (u._id === id ? { ...u, blocked: !blocked } : u)));
  };

  const deleteListing = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/listings/${id}`);
    setListings(listings.filter((l) => l._id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button onClick={() => setTab("stats")} disabled={tab === "stats"}>Stats</button>
        <button onClick={() => setTab("users")} disabled={tab === "users"}>Users</button>
        <button onClick={() => setTab("listings")} disabled={tab === "listings"}>Listings</button>
      </div>

      {tab === "stats" && stats && (
        <div className="stats">
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Listings: {stats.totalListings}</p>
          <p>Active Listings: {stats.activeListings}</p>
        </div>
      )}

      {tab === "users" && (
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.blocked ? "Blocked" : "Active"}</td>
                <td>
                  <button onClick={() => toggleBlockUser(u._id, u.blocked)}>
                    {u.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "listings" && (
        <table>
          <thead>
            <tr><th>Title</th><th>Owner</th><th>Action</th></tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l._id}>
                <td>{l.title}</td>
                <td>{l.owner?.name}</td>
                <td><button onClick={() => deleteListing(l._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;