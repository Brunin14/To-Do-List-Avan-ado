import React, { useState, useEffect } from 'react';
import BackButton from '../Components/BackButton';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [newNote, setNewNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const saveNotes = (notesArray) => {
    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const noteObj = {
      text: newNote,
      timestamp: new Date().toLocaleString('pt-BR')
    };
    saveNotes([noteObj, ...notes]);
    setNewNote('');
  };

  const deleteNote = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    saveNotes(updated);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(notes[index].text);
  };

  const saveEdit = () => {
    const updated = [...notes];
    updated[editingIndex].text = editText;
    saveNotes(updated);
    setEditingIndex(null);
  };

  return (
    <div className="notes-container">
      <BackButton />
      <h1 className="notes-title">📝 Caderno de Mensagens</h1>

      <div className="note-form">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escreva sua mensagem..."
          rows={4}
          className="note-textarea"
        />
        <button onClick={addNote} className="note-button">💾 Salvar</button>
      </div>

      <div className="note-history">
        {notes.map((note, idx) => (
          <div key={idx} className="note-card">
            {editingIndex === idx ? (
              <div className="edit-section">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={4}
                  className="note-edit-textarea"
                />
                <button onClick={saveEdit} className="note-button">✅ Confirmar</button>
              </div>
            ) : (
              <div className="view-section">
                <p className="note-text">{note.text}</p>
                <small className="note-timestamp">📅 {note.timestamp}</small>
                <div className="note-actions">
                  <button className="edit-button" onClick={() => startEdit(idx)}>✏️ Editar</button>
                  <button className="delete-button" onClick={() => deleteNote(idx)}>🗑️ Excluir</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
