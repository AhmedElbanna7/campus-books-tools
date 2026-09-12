import './card.css';
import { Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Heart } from 'lucide-react';
import Skeleton from '../Listing&Favorites/Skeleton';

function OperationTypeBadge({ operationType }) {
  if (!operationType) return null;
  return (
    <span className={`operation-type-badge operation-type-${operationType}`}>
      {operationType}
    </span>
  );
}

function Card({ items, loading }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    if (!isAuthenticated) return;

    axios.get(`${import.meta.env.VITE_API_URL}/favorites`)
      .then((res) => {
        const ids = new Set(res.data.map((f) => f._id));
        setFavoriteIds(ids);
      })
      .catch((err) => console.error('Failed to load favorites:', err));
  }, [isAuthenticated]);

  const toggleFavorite = async (e, listing_Id) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const isFavorited = favoriteIds.has(listing_Id);

    try {
      if (isFavorited) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/deletefavorites/${listing_Id}`);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(listing_Id);
          return next;
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/addfavorites/${listing_Id}`);
        setFavoriteIds((prev) => new Set(prev).add(listing_Id));
      }
    } catch (err) {
      console.error('Failed to update favorite:', err);
    }
  };
  return (
    <>
      {loading ? (
        <Skeleton count={8} />
      ) : items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        items.map((item, index) => {
          const itemId = item._id || index;
          const isFavorited = favoriteIds.has(itemId);
          const ownerId = item.owner?._id || item.owner;
          const isOwner = user && ownerId === user._id;
          return (
            <div className="card" key={itemId}>
              <div className="card-image-wrapper">
                <img src={item.images[0]} alt={item.title} />

                {!isOwner && (
                  <button
                    className="favorite-btn"
                    onClick={(e) => toggleFavorite(e, itemId)}
                    aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      size={20}
                      fill={isFavorited ? '#e63946' : 'none'}
                      color={isFavorited ? '#e63946' : '#666'}
                    />
                  </button>
                )}
              </div>
              <div className="card-header">
                <h3>{item.title}</h3>
                <OperationTypeBadge operationType={item.operation} />
              </div>
              <p>Category: {item.category}</p>
              <p>Type: {item.itemType}</p>
              <Link to={`/listing/${item._id || index}`}>
                <button className="view-details-btn">View Details</button>
              </Link>
            </div>
          )
        })
      )}
    </>
  )
}
export default Card;