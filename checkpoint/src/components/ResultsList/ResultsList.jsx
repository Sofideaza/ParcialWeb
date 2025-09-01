import "./ResultsList.css";
import BookCard from "../BookCard/BookCard.jsx";

export default function ResultsList({ items, onAdd, adding, readingKeys }) {
  if (adding) return <div className="rl-empty">Cargando…</div>;
  if (!adding && items.length === 0) return <div className="rl-empty">Sin resultados</div>;

  return (
    <section className="section">
      <h2>Resultados</h2>
      <div className="rl-grid">
        {items.map(b => (
          <BookCard
            key={b.key}
            book={b}
            onAdd={onAdd}
            disabled={adding}
            inList={readingKeys.has(b.key)}
          />
        ))}
      </div>
    </section>
  );
}
