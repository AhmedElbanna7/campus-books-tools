import { Trash2 } from "lucide-react";
import StatusPill from "./StatusPill";

const STATUS_LABELS = {
  available: "Available",
  borrowed: "Borrowed",
  sold: "Sold",
};

function ListingsTab({ listings, onDelete }) {
  return (
    <section className="cs-card">
      <div className="cs-card__head">
        <h2>Listings</h2>
        <p>Books and tools shared by users</p>
      </div>

      {listings.length === 0 ? (
        <p className="cs-empty">No listings left to show.</p>
      ) : (
        <div className="cs-table-wrapper">
          <table className="cs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Owner</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l._id}>
                  <td>{l.title}</td>
                  <td>{l.owner?.name || "Unknown"}</td>
                  <td>{l.category}</td>
                  <td>
                    <StatusPill status={l.status.toLowerCase()} labels={STATUS_LABELS} />
                  </td>
                  <td className="cs-action-cell">
                    <button className="cs-btn-danger" onClick={() => onDelete(l)}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ListingsTab;
