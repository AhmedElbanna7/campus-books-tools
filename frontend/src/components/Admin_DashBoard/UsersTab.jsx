import { Ban, Check, Trash2, ShieldPlus, ShieldMinus } from "lucide-react";
import StatusPill from "./StatusPill";

function UsersTab({ users, currentUserId, onToggleBlock, onToggleRole, onDelete }) {
  return (
    <section className="cs-card">
      <div className="cs-card__head">
        <h2>User Records</h2>
      </div>

      {users.length === 0 ? (
        <p className="cs-empty">No users left to show.</p>
      ) : (
        <div className="cs-table-wrapper">
          <table className="cs-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u._id === currentUserId;
                const isBlocked = u.isBlocked;
                const isAdmin = u.role === "admin";

                return (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <StatusPill
                        status={isAdmin ? "admin" : "user"}
                        labels={{ admin: "Admin", user: "User" }}
                      />
                    </td>
                    <td>
                      <StatusPill
                        status={isBlocked ? "blocked" : "active"}
                        labels={{ active: "Active", blocked: "Blocked" }}
                      />
                    </td>
                    <td className="cs-action-cell">
                      <button
                        className="cs-btn-submit cs-btn-sm"
                        onClick={() => onToggleBlock(u)}
                        disabled={isSelf}
                        title={isSelf ? "You can't Block yourself" : ""}
                      >
                        {isBlocked ? <Check size={14} /> : <Ban size={14} />}
                        {isBlocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        className="cs-btn-ghost"
                        onClick={() => onToggleRole(u)}
                        disabled={isSelf}
                        title={isSelf ? "You can't change your own role" : ""}
                      >
                        {isAdmin ? <ShieldMinus size={14} /> : <ShieldPlus size={14} />}
                        {isAdmin ? "Make User" : "Make Admin"}
                      </button>

                      <button
                        className="cs-btn-danger"
                        onClick={() => onDelete(u)}
                        disabled={isSelf}
                        title={isSelf ? "You can't delete your own account" : ""}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UsersTab;
