import React, { useState, useEffect } from 'react';
import store from '../stores/TaskStore';
import Task from './Task';
import SelectedTasks from './SelectedTasks';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());

  useEffect(() => {
    setTasks(store.getItems());
    const updateHandler = () => {
      setTasks([...store.getItems()]);
    };
    store.emitter.addEventListener('UPDATE', updateHandler);
    return () => {
      store.emitter.removeEventListener('UPDATE', updateHandler);
    };
  }, []);

  const selectTask = (task) => {
    setSelectedTaskIds((prev) => new Set(prev).add(task.id));
  };

  const deselectTask = (task) => {
    setSelectedTaskIds((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(task.id);
      return updatedSet;
    });
  };

  const selectedTasks = tasks.filter((task) => selectedTaskIds.has(task.id));

  return (
    <div>
      <h1>A list of tasks</h1>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            item={task}
            onSelect={selectTask}
            onDeselect={deselectTask}
            isSelected={selectedTaskIds.has(task.id)}
          />
        ))}
      </div>
      <SelectedTasks selectedTasks={selectedTasks} />
    </div>
  );
}

export default TaskList;
