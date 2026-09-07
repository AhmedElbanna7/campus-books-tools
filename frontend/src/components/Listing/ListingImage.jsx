function ListingImage({ src, alt }) {
  return (
    <img
      className="w-full h-64 object-cover rounded-3xl mb-4"
      src={src}
      alt={alt}
    />
  );
}
export default ListingImage;
