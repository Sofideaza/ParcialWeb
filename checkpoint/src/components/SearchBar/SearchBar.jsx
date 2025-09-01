import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, disabled }) {
  const [text, setText] = useState("");

  const submit = (e) => { e.preventDefault(); onSearch?.(text); };

  return (
    <form className="sb-row" onSubmit={submit}>
      <input
        className="sb-input"
        placeholder="Busca libros (ej. harry potter)"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        disabled={disabled}
      />
      <button className="sb-btn" disabled={disabled}>Buscar</button>
    </form>
  );
}
