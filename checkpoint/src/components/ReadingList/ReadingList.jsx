import "./ReadingList.css";
import ReadingItem from "../ReadingItem/ReadingItem.jsx";

export default function ReadingList({ items, onSaveItem, onDeleteItem }) {
  return (
    <section className="section">
      <h2>Mi Lista de Lectura</h2>
      {items.length === 0 ? (
        <div className="rl2-empty">Tu lista está vacía</div>
      ) : (
        <div className="rl2-col">
          {items.map((it) => (
            <ReadingItem
              key={it.key}
              item={it}
              onSave={onSaveItem}
              onDelete={onDeleteItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}
