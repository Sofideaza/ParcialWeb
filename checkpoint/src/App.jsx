import { useMemo, useState } from "react";
import "./app.css";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ResultsList from "./components/ResultsList/ResultsList.jsx";
import ReadingList from "./components/ReadingList/ReadingList.jsx";
import { useBooks } from "./hooks/useBooks.js";

export default function App() {
  const { loading, error, results, searchBooks } = useBooks();

  const [reading, setReading] = useState([]);

  const readingKeys = useMemo(
    () => new Set(reading.map((b) => b.key)),
    [reading]
  );

  const addToReading = (book) => {
    if (!book || readingKeys.has(book.key)) return;
    setReading((prev) => [
      ...prev,
      { ...book, status: "Pendiente", notes: "" },
    ]);
  };

  const saveItem = (key, changes) => {
    setReading((prev) => prev.map(b => (b.key === key ? { ...b, ...changes } : b)));
  };

  const deleteItem = (key) => {
    setReading((prev) => prev.filter(b => b.key !== key));
  };

  return (
    <div className="container">
      <h1>BookTrack</h1>
      <p>Busca libros en Open Library y crea tu lista de lectura.</p>

      <SearchBar onSearch={searchBooks} disabled={loading} />

      {error && <div className="section" style={{color:"#fecaca"}}>Error: {error}</div>}

      <ResultsList
        items={results}
        onAdd={addToReading}
        adding={loading}
        readingKeys={readingKeys}
      />

      <hr />

      <ReadingList
        items={reading}
        onSaveItem={saveItem}
        onDeleteItem={deleteItem}
      />
    </div>
  );
}
