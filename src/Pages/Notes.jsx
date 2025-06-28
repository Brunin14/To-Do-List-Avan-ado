import React, { useState, useEffect } from 'react';
import BackButton from '../Components/BackButton';

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
    <div>
      <BackButton />
      <h1>📝 Caderno de Mensagens</h1>
      <textarea
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        placeholder="Escreva sua mensagem..."
        rows={4}
        className="note-textarea"
      />
      <button onClick={addNote}>Salvar</button>

      <div className="note-history">
        {notes.map((note, idx) => (
          <div key={idx} className="note-card">
            {editingIndex === idx ? (
              <>
                <textarea
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  rows={4}
                  className="note-edit-textarea"
                />
                <button onClick={saveEdit}>💾 Salvar</button>
              </>
            ) : (
              <>
                <p>{note.text}</p>
                <small>📅 {note.timestamp}</small><br />
                <button onClick={() => startEdit(idx)}>✏️ Editar</button>
                <button onClick={() => deleteNote(idx)} style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}>🗑️ Excluir</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
