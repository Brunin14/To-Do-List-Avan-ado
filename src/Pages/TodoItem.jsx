import React, { useState } from 'react';
import './TodoItem.css'; // ou combine no style global se preferir

function TodoItem({ task, setTasks }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const toggleDone = () => {
    setTasks(prev =>
      prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t)
    );
  };

  const deleteTask = () => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const saveEdit = () => {
    if (!newText.trim()) return;
    setTasks(prev =>
      prev.map(t => t.id === task.id ? { ...t, text: newText.trim() } : t)
    );
    setEditing(false);
  };

  return (
    <li className={`todo-item ${task.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={toggleDone}
        className="todo-checkbox"
      />

      {editing ? (
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          className="todo-edit-input"
        />
      ) : (
        <span className="todo-text">{task.text}</span>
      )}

      <div className="todo-actions">
        {editing ? (
          <button className="todo-save" onClick={saveEdit}>💾 Salvar</button>
        ) : (
          <button className="todo-edit" onClick={() => setEditing(true)}>✏️ Editar</button>
        )}
        <button className="todo-delete" onClick={deleteTask}>🗑️</button>
      </div>
    </li>
  );
}

export default TodoItem;
