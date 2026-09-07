function ListingInfo({ title, description, condition, location, ownerName }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-4">{description}</p>
      <p><strong>Condition:</strong> {condition}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Owner:</strong> {ownerName}</p>
    </div>
  );
}
export default ListingInfo;
