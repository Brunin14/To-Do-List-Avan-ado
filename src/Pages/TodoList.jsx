import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import TodoItem from './TodoItem';
import BackButton from '../Components/BackButton';
import './TodoList.css';

function TodoList() {
  const { usuario } = useContext(AuthContext); // ✅ pega o usuário atual

  const storageKey = `tasks_${usuario?.email || 'anonimo'}`;

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Erro ao ler tarefas do localStorage:', error);
      return [];
    }
  });

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas no localStorage:', error);
    }
  }, [tasks, storageKey]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      done: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
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
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button className="add-button" onClick={addTask}>➕ Adicionar</button>
      </div>

      <div className="filter-group">
        <label htmlFor="taskFilter">Filtro:</label>
        <select
          id="taskFilter"
          className="todo-filter"
          onChange={e => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">📋 Todas</option>
          <option value="done">✅ Completas</option>
          <option value="todo">🕓 Pendentes</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))
        ) : (
          <li className="no-tasks">Nenhuma tarefa aqui.</li>
        )}
      </ul>

      <BackButton />
    </div>
  );
}

export default TodoList;
