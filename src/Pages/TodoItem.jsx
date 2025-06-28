import React, { useState } from 'react';

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
    setTasks(prev =>
      prev.map(t => t.id === task.id ? { ...t, text: newText } : t)
    );
    setEditing(false);
  };

  return (
    <li>
      <input type="checkbox" checked={task.done} onChange={toggleDone} />
      {editing ? (
        <>
          <input value={newText} onChange={e => setNewText(e.target.value)} />
          <button onClick={saveEdit}>💾 Salvar</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
          <button onClick={() => setEditing(true)}>✏️ Editar</button>
        </>
      )}
      <button onClick={deleteTask}>🗑️</button>
    </li>
  );
}

export default TodoItem;
