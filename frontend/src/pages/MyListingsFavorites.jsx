import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyListingsFavorites() {
  const [tab, setTab] = useState("mine");
  const [myListings, setMyListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/api/listings/mine"),
      axios.get("http://localhost:5000/api/favorites"),
    ])
      .then(([mineRes, favRes]) => {
        setMyListings(mineRes.data);
        setFavorites(favRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/listings/${id}`);
    setMyListings(myListings.filter((l) => l._id !== id));
  };

  const handleRemoveFavorite = async (id) => {
    await axios.delete(`http://localhost:5000/api/favorites/${id}`);
    setFavorites(favorites.filter((l) => l._id !== id));
  };

  const items = tab === "mine" ? myListings : favorites;

  return (
    <div className="my-listings-page">
      <div className="tabs">
        <button onClick={() => setTab("mine")} disabled={tab === "mine"}>My Listings</button>
        <button onClick={() => setTab("favorites")} disabled={tab === "favorites"}>Favorites</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>Nothing here yet.</p>
      ) : (
        <div className="listings-grid">
          {items.map((item) => (
            <div key={item._id} className="listing-card">
              <Link to={`/listing/${item._id}`}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
              </Link>
              {tab === "mine" ? (
                <>
                  <Link to={`/listing/edit/${item._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </>
              ) : (
                <button onClick={() => handleRemoveFavorite(item._id)}>Remove</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListingsFavorites;