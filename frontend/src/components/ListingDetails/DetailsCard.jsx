import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Contact from "./Contact";

const OPERATION_LABELS = {
  Sale: "For Sale",
  Borrow: "For Borrow",
  Both: "Sale or Borrow",
};

function OperationBadge({ operation }) {
  if (!operation) return null;
  return (
    <span className={`operation-badge operation-${operation.toLowerCase()}`}>
      {OPERATION_LABELS[operation] || operation}
    </span>
  );
}

function DetailsCard( {item}) {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [contactInfo, setContactInfo] = useState(null);
    const [contactLoading, setContactLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    const listingId = item.listing._id;

    useEffect(() => {
        if (!isAuthenticated) return;

        axios.get(`${import.meta.env.VITE_API_URL}/favorites`)
            .then((res) => {
                const alreadyFavorited = res.data.favorites.some(
                    (f) => f.listing._id === listingId
                );
                setIsFavorited(alreadyFavorited);
            })
            .catch((err) => console.error('Failed to load favorites:', err));
    }, [isAuthenticated, listingId]);

    const handleToggleFavorite = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setFavoriteLoading(true);

        try {
            if (isFavorited) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/deletefavorites/${listingId}`);
                setIsFavorited(false);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/addfavorites/${listingId}`);
                setIsFavorited(true);
            }
        } catch (err) {
            console.error('Failed to update favorite:', err);
        } finally {
            setFavoriteLoading(false);
        }
    };

    const handleContactOwner = async () => {
        setIsOpen(true);
        setContactLoading(true);

        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/listingsDetails/${listingId}/contact`
            );
            setContactInfo(res.data);
        } catch (error) {
            console.error("Failed to fetch contact info:", error);
            setContactInfo(null);
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <>
        <section className="details-card">
            <div className="book-image">
            <img src={item.listing.image} alt={item.listing.title} />
            </div>

            <div className="book-info">
            <div className="badges-row">
              <span className="item-type">{item.listing.itemType}</span>
              <OperationBadge operation={item.listing.operation} />
            </div>
            <h1>{item.listing.title}</h1>

            <div className="price-display">
              {item.listing.isFree ? (
                <span className="price-free">Free</span>
              ) : (
                <span className="price-amount">{item.listing.price} EGP</span>
              )}
            </div>

            <p className="description">{item.listing.description}</p>

            <div className="info-grid">
                <div className="info-box">
                <span>Category</span>
                <strong>{item.listing.category}</strong>
                </div>
                <div className="info-box">
                <span>Type</span>
                <strong className="available">{item.listing.itemType}</strong>
                </div>
                <div className="info-box">
                <span>Condition</span>
                <strong className="available">{item.listing.condition}</strong>
                </div>
                <div className="info-box">
                <span> Status</span>
                <strong className="available">{item.listing.status}</strong>
                </div>
            </div>

            <div className="owner">
                <div className="owner-avatar">{item.listing.owner.name?.charAt(0)}</div>
                <div>
                <span>Listed by</span>
                <strong>{item.listing.owner.name}</strong>
                </div>
            </div>

            <div className="actions">
                {user ? (
                    <button className="request-btn" onClick={handleContactOwner}>
                        Contact Owner
                    </button>
                ) : (
                    <button className="request-btn" disabled title="Log in to contact the owner">
                        Log in to Contact
                    </button>
                )}
                <Contact
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    loading={contactLoading}
                    contact={contactInfo}
                />
                <button
                    className="save-btn"
                    onClick={handleToggleFavorite}
                    disabled={favoriteLoading}
                    aria-pressed={isFavorited}
                >
                    {isFavorited ? "Saved ✓" : "Save"}
                </button>
            </div>
            </div>
      </section>
        </>
    )
}
export default DetailsCard;