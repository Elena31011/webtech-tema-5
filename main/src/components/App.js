import React, { useState, useEffect } from 'react';
import Task from './Task';
import store from '../stores/TaskStore';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    setTasks(store.getItems());
    store.emitter.addEventListener('UPDATE', () => {
      setTasks([...store.getItems()]);
    });
  }, []);

  const selectTask = (task) => {
    if (!selectedTasks.find((t) => t.id === task.id)) {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const deselectTask = (task) => {
    setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div>
      <h1>Task List</h1>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            item={task}
            onSelect={selectTask}
            onDeselect={deselectTask}
            isSelected={selectedTasks.find((t) => t.id === task.id)}
          />
        ))}
      </div>
      <h2>Selected Tasks</h2>
      <ul>
        {selectedTasks.map((task) => (
          <li key={task.id}>
            {task.description} {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
