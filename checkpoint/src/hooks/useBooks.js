import { useState } from "react";

export function useBooks() {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [results, setResults] = useState([]);

  async function searchBooks(query) {
    const q = String(query || "").trim();
    if (!q) { setResults([]); setError(null); return; }

    try {
      setLoading(true); setError(null); setResults([]);
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const books = (data.docs || []).map((d) => ({
        key: d.key,
        title: d.title || "Sin título",
        author: (d.author_name && d.author_name[0]) || "Autor desconocido",
        year: d.first_publish_year || null,
      }));
      setResults(books);
    } catch (err) {
      setError(err.message || "Error buscando libros");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, results, searchBooks };
}
