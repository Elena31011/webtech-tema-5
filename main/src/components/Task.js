import React from 'react';

function Task({ item, onSelect, onDeselect, isSelected }) {
  return (
    <div>
      {item.description} {item.priority}
      {!isSelected ? (
        <button onClick={() => onSelect(item)}>select</button>
      ) : (
        <button onClick={() => onDeselect(item)}>deselect</button>
      )}
    </div>
  );
}

export default Task;
