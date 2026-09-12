import './contact.css';
function Contact({ isOpen, onClose, loading, contact }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <h2>Contact Owner</h2>

                {loading ? (
                    <p>Loading contact info...</p>
                ) : contact ? (
                    <div className="contact-info">
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                    </div>
                ) : (
                    <p>Could not load contact info.</p>
                )}
            </div>
        </div>
    );
}

export default Contact;