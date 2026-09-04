import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Browse() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/listings", { params: { search, type } })
      .then((res) => setListings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [search, type]);

  return (
    <div className="browse-page">
      <h1>Browse Listings</h1>
      <div className="filters">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="book">Books</option>
          <option value="tool">Tools</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="listings-grid">
          {listings.map((item) => (
            <Link to={`/listing/${item._id}`} key={item._id} className="listing-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price ? `${item.price} EGP` : "Free"}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;