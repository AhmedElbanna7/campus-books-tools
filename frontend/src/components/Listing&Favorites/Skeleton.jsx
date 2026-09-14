function Skeleton({ count }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="sk-block sk-media"></div>
          <div className="sk-block sk-line"></div>
          <div className="sk-block sk-line short"></div>
        </div>
      ))}
    </>
  );
}

export default Skeleton;
