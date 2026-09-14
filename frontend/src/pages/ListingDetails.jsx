import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../components/ListingDetails/ListingDetails.css";
import Header from "../components/Header/Header.jsx";
import DetailsCard from "../components/ListingDetails/DetailsCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";


function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/listingDetails/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header isAdmin={isAdmin}/>
    <main>
      <a href="/" className="back-btn">
        ← Back to Browse
      </a>

      <DetailsCard item={listing}/>
    </main>
    </>
  );
}

export default ListingDetails;
