import "./BookCard.css";

export default function BookCard({ book, onAdd, disabled, inList }) {
  const { title, author, year } = book;

  return (
    <div className="bc-card">
      <h4 className="bc-title" title={title}>{title}</h4>
      <p className="bc-sub">Autor: {author}</p>
      <p className="bc-sub">Año: {year ?? "—"}</p>
      <button
        className="bc-btn"
        onClick={() => onAdd?.(book)}
        disabled={disabled || inList}
      >
        {inList ? "Ya en lista" : "Agregar a Lista"}
      </button>
    </div>
  );
}
