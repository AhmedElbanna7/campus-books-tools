import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleContact = () => {
    if (listing?.owner?.email) {
      window.location.href = `mailto:${listing.owner.email}`;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found.</p>;

  return (
    <div className="listing-details-page">
      <img src={listing.image} alt={listing.title} />
      <h1>{listing.title}</h1>
      <p>{listing.price ? `${listing.price} EGP` : "Free"}</p>
      <p>Condition: {listing.condition}</p>
      <p>{listing.description}</p>
      {user && (
        <button onClick={handleContact}>Contact Owner</button>
      )}
    </div>
  );
}

export default ListingDetails;