export default function Showcase() {
  return (
    <aside className="showcase">
      <div className="showcase__texture"></div>

      <div className="showcase__top">
        <div className="brand">
          <div className="brand__mark">
            <i className="fa-solid fa-book-open"></i>
          </div>
          <div className="brand__name">Mishkat</div>
        </div>

        <p className="showcase__tag">A platform for exchanging books and study tools</p>
      </div>

      <div className="showcase__mid">
        <h1 className="showcase__headline">
          Your old book,
          <br />
          could be the beginning
          <br />
          of new knowledge.
        </h1>

        <p className="showcase__sub">
          A platform that brings university students together to exchange books and study
          tools easily and safely.
        </p>

        <ul className="showcase__stats">
          <li>
            <strong>1K+</strong>
            <span>Books Available</span>
          </li>
          <li>
            <strong>500+</strong>
            <span>Students</span>
          </li>
          <li>
            <strong>20+</strong>
            <span>Faculties</span>
          </li>
        </ul>
      </div>

      <div className="showcase__books">
        <i className="fa-solid fa-book"></i>
        <i className="fa-solid fa-book-open"></i>
        <i className="fa-solid fa-bookmark"></i>
        <i className="fa-solid fa-graduation-cap"></i>
      </div>
    </aside>
  );
}
