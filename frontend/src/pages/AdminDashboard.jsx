import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, PieChart, Users as UsersIcon, Book } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import AnalyticsTab from "../components/Admin_DashBoard/AnalyticsTab";
import UsersTab from "../components/Admin_DashBoard/UsersTab";
import ListingsTab from "../components/Admin_DashBoard/ListingsTab";
import useToast from "../components/Listing&Favorites/useToast";
import ToastRegion from "../components/Listing&Favorites/ToastRegion";
import "../components/Admin_DashBoard/admindashboard.css";

const TABS = [
  { id: "analytics", label: "Analytics", icon: PieChart },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "listings", label: "Listings", icon: Book },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { toasts, showToast } = useToast();

  const [activeTab, setActiveTab] = useState("analytics");

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const [listings, setListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  const [deleteUser, setDeleteUser] = useState(null);
  const [deleteListing, setDeleteListing] = useState(null);

  const navigate = useNavigate();

  // Load data 
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("Failed to load stats:", err);
        showToast("Couldn't load dashboard stats", "error");
      })
      .finally(() => setStatsLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Failed to load users:", err);
        showToast("Couldn't load users", "error");
      })
      .finally(() => setUsersLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/listings`)
      .then((res) => setListings(res.data))
      .catch((err) => {
        console.error("Failed to load listings:", err);
        showToast("Couldn't load listings", "error");
      })
      .finally(() => setListingsLoading(false));
  }, []);

  //block,unblock
  const ToggleBlock = async (user) => {
    const action = user.isBlocked ? "unblock" : "block";

    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/users/${user._id}/${action}`
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? res.data.user : u))
      );
      showToast(`User ${action}ed`, "success");
    } catch (err) {
      console.error(`Failed to ${action} user:`, err);
      showToast(err.response?.data?.message || `Failed to ${action} user`, "error");
    }
  };
  // admin,user
  const ToggleRole = async (user) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/userrole/${user._id}`
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, role: res.data.role } : u))
      );
      showToast(`Role changed to ${res.data.role}`, "success");
    } catch (err) {
      console.error("Failed to change role:", err);
      showToast(err.response?.data?.message || "Failed to change role", "error");
    }
  };
  //delete user
  const DeleteUser = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${deleteUser._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteUser._id));
      showToast("User deleted", "success");
    } catch (err) {
      console.error("Failed to delete user:", err);
      showToast(err.response?.data?.message || "Failed to delete user", "error");
    } finally {
      setDeleteUser(null);
    }
  };

  // delete item
  const DeleteListing = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/listings/${deleteListing._id}`);
      setListings((prev) => prev.filter((l) => l._id !== deleteListing._id));
      showToast("Listing deleted", "success");
    } catch (err) {
      console.error("Failed to delete listing:", err);
      showToast(err.response?.data?.message || "Failed to delete listing", "error");
    } finally {
      setDeleteListing(null);
    }
  };

  return (
    <div className="cs-root">
      <div className="cs-app-layout">
        <aside className="cs-sidebar">
          <div className="cs-brand">
            <BookOpen size={22} className="cs-brand-icon" />
            <span className="cs-brand-name" onClick={() => (navigate("/"))}>CampusShare</span>
          </div>

          <nav className="cs-tabs">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`cs-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={15} /> {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="cs-main-content">
          <header className="cs-top-header">
            <h2>Control Panel</h2>
            <div className="cs-user-badge">
              <span>Welcome, {user?.name || "Admin"}</span>
            </div>
          </header>

          {activeTab === "analytics" && (
            <AnalyticsTab stats={stats} loading={statsLoading} />
          )}

          {activeTab === "users" && (
            usersLoading ? (
              <p className="cs-empty">Loading users…</p>
            ) : (
              <UsersTab
                users={users}
                currentUserId={user?._id}
                onToggleBlock={ToggleBlock}
                onToggleRole={ToggleRole}
                onDelete={setDeleteUser}
              />
            )
          )}

          {activeTab === "listings" && (
            listingsLoading ? (
              <p className="cs-empty">Loading listings…</p>
            ) : (
              <ListingsTab listings={listings} onDelete={setDeleteListing} />
            )
          )}
        </main>
      </div>

      <ToastRegion toasts={toasts} />

      {deleteUser && (
        <div className="modal-overlay">
          <div className="modal" role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setDeleteUser(null)}>✕</button>
            <h2>Delete user</h2>
            <p>
              Are you sure you want to delete "{deleteUser.name}"? This will also
              delete all their listings and favorites. This can't be undone.
            </p>
            <div className="modal-actions">
              <button className="cs-btn-ghost" onClick={() => setDeleteUser(null)}>
                Cancel
              </button>
              <button className="cs-btn-danger" onClick={DeleteUser}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteListing && (
        <div className="modal-overlay">
          <div className="modal" role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setDeleteListing(null)}>✕</button>
            <h2>Delete listing</h2>
            <p>Are you sure you want to delete "{deleteListing.title}"? This can't be undone.</p>
            <div className="modal-actions">
              <button className="cs-btn-ghost" onClick={() => setDeleteListing(null)}>
                Cancel
              </button>
              <button className="cs-btn-danger" onClick={DeleteListing}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
