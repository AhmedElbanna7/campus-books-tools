function ContactButton({ onContact }) {
  return (
    <button
      onClick={onContact}
      className="bg-primary text-white font-semibold p-2 rounded-big mt-4"
    >
      Contact Owner
    </button>
  );
}
export default ContactButton;
