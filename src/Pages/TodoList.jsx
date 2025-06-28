import React, { useState } from 'react';
import TodoItem from './TodoItem';
import BackButton from '../Components/BackButton';


function TodoList({ tasks, setTasks }) {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      text: input,
      done: false,
      createdAt: new Date()
    }]);
    setInput('');
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : filter === 'done' ? task.done : !task.done
  );

  return (
    <div>
      <input
  className="todo-input"
  placeholder="Adicione uma nova tarefa..."
  value={input}
  onChange={e => setInput(e.target.value)}
/>
<button className="add-button" onClick={addTask}>➕</button>
      <div className="filter-container">
  <label>Filtro: </label>
  <select className="todo-filter" onChange={e => setFilter(e.target.value)}>
    <option value="all">📋 Todas</option>
    <option value="done">✅ Completas</option>
    <option value="todo">🕓 Pendentes</option>
  </select>
</div>
      <ul>
        {filteredTasks.map(task => (
          <TodoItem key={task.id} task={task} setTasks={setTasks} />
          
        ))}
      </ul>
      <BackButton />
    </div>
  );
}

export default TodoList;
