import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import ItemCard from "../components/Listing&Favorites/ItemCard";
import Skeleton from "../components/Listing&Favorites/Skeleton";
import ToastRegion from "../components/Listing&Favorites/ToastRegion";
import useToast from "../components/Listing&Favorites/useToast";
import "../components/Listing&Favorites/MyListingsFavorites.css";
import { useAuth } from "../context/AuthContext";

function MyListings() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { toasts, showToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  //search
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const timer = setTimeout(async () => {
      const params = {};
      if (status) params.status = status;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/listingsByOwner`, { params });
        setListings(res.data);
      } catch (error) {
        console.error('Search failed:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [user, status]);

  //Edit
  const Edit = (item) => {
    navigate(`/listing/edit/${item._id}`);
  };

  //Delete
  const Delete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deletelistings/${deleteTarget._id}`);
      setListings((list) => list.filter((item) => item._id !== deleteTarget._id));
      showToast("Listing deleted", "success");
    } catch (error) {
      console.error('Delete failed:', error);
      showToast("Failed to delete listing", "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Header />
      <div className="page">
        <header className="page-header">
          <h1>My Listings</h1>
          <p>Manage the books and tools you're sharing with classmates.</p>
        </header>

        <div className="toolbar">
          <div className="toolbar-filters">
            <select
              className="chip"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="Available">Available</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
          <button
            className="btn btn-submit"
            onClick={() => navigate("/listing/create")}
          >
            + Add Listing
          </button>
        </div>

        {loading ? (
          <div className="listings-grid">
            <Skeleton count={8} />
          </div>
        ) : listings.length === 0 ? (
          <div className="empty-state">
            <h2>No listings yet</h2>
            <p>Start sharing your books or tools with classmates on campus.</p>
            <button
              className="btn btn-submit"
              onClick={() => navigate("/listing/create")}
            >
              + Add your first listing
            </button>
          </div>
        ) : (
          <div className="listings-grid">
            {listings.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                showEditDelete
                favorited={false}
                onToggleFavorite={() => { }}
                onEdit={Edit}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}

        <ToastRegion toasts={toasts} />

        {deleteTarget && (
          <div className="modal-overlay">
            <div className="modal" role="dialog" aria-modal="true">
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>✕</button>
              <h2>Delete listing</h2>
              <p>Are you sure you want to delete "{deleteTarget.title}"? This can't be undone.</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                  Cancel
                </button>
                <button className="btn btn-danger-solid" onClick={Delete} disabled={deleting}>
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyListings;
