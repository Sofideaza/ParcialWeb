import { useEffect, useState } from "react";
import "./ReadingItem.css";

const OPTIONS = ["Pendiente", "Leyendo", "Terminado"];

export default function ReadingItem({ item, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus]   = useState(item.status);
  const [notes, setNotes]     = useState(item.notes);

  useEffect(() => {
    setStatus(item.status);
    setNotes(item.notes);
  }, [item]);

  const save = () => {
    onSave?.(item.key, { status, notes });
    setEditing(false);
  };

  return (
    <div className="ri-card">
      <div className="ri-head">
        <div>
          <h4 className="ri-title">{item.title}</h4>
          <p className="ri-sub">Autor: {item.author} · Año: {item.year ?? "—"}</p>
        </div>
        <div className="ri-actions">
          {editing ? (
            <button className="ri-btn primary" onClick={save}>Guardar</button>
          ) : (
            <button className="ri-btn" onClick={() => setEditing(true)}>Editar</button>
          )}
          <button className="ri-btn danger" onClick={() => onDelete?.(item.key)}>Eliminar</button>
        </div>
      </div>

      <div className="ri-form">
        <div className="ri-field">
          <label>Estado de lectura</label>
          <select
            value={editing ? status : item.status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={!editing}
          >
            {OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="ri-field">
          <label>Notas</label>
          <textarea
            rows={3}
            value={editing ? notes : item.notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={!editing}
            placeholder="Tus ideas, citas, páginas…"
          />
        </div>
      </div>
    </div>
  );
}
