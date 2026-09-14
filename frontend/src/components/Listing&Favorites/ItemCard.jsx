import { Heart } from 'lucide-react'
function StatusBadge({ status }) {
  if (status === "Available") return <span className="badge badge-available">Available</span>;
  if (status === "Borrowed") return <span className="badge badge-exchanged">Borrowed</span>;
  return <span className="badge badge-pending">Sold</span>;
}

function ItemCard({ item, showEditDelete, favorited, onToggleFavorite, onEdit, onDelete }) {
  return (
    <div className="item-card">
      <div className="item-card__media">
        <img src={item.images} alt={item.title} />
        {!showEditDelete && (
        <button
          className="fav-btn"
          aria-pressed={favorited}
          aria-label="Save to favorites"
          onClick={() => onToggleFavorite(item)}
        >
          <Heart
            size={20}
            fill={favorited ? '#e63946' : 'none'}
            color={favorited ? '#e63946' : '#666'}
          />
        </button>
        )}
      </div>
      <StatusBadge status={item.status} />
      <h3>{item.title}</h3>
      <div className="item-card__meta">{item.category} · {item.condition}</div>
      {showEditDelete && (
        <div className="item-card__actions">
          <button className="btn btn-outline btn-small" onClick={() => onEdit(item)}>Edit</button>
          <button className="btn btn-danger-outline btn-small" onClick={() => onDelete(item)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export { ItemCard, StatusBadge };
export default ItemCard;
