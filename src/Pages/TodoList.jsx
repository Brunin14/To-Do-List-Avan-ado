import React, { useState } from 'react';
import TodoItem from './TodoItem';
import BackButton from '../Components/BackButton';
import './TodoList.css'; // Importa o CSS novo

function TodoList({ tasks, setTasks }) {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : filter === 'done' ? task.done : !task.done
  );

  return (
    <div className="todo-container">
      <h2 className="todo-title">📘 Minhas Tarefas</h2>
      <div className="input-group">
        <input
          className="todo-input"
          placeholder="Escreva sua tarefa aqui..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="add-button" onClick={addTask}>➕ Adicionar</button>
      </div>

      <div className="filter-group">
        <label htmlFor="taskFilter">Filtro:</label>
        <select
          id="taskFilter"
          className="todo-filter"
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">📋 Todas</option>
          <option value="done">✅ Completas</option>
          <option value="todo">🕓 Pendentes</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <TodoItem key={task.id} task={task} setTasks={setTasks} />
        ))}
      </ul>

      <BackButton />
    </div>
  );
}

export default TodoList;
