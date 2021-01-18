import React from "react";
import { FaEdit, FaTrash, FaCheckSquare } from "react-icons/fa";

const List = ({ items, removeItem, editItem, completeToggle, filtered }) => {
  return (
    <div>
      {filtered.map((item) => {
        const { id, title, completed } = item;
        return (
          <article
            key={id}
            className={`to-do-item ${completed ? "completed" : ""}`}
          >
            <p className='title'>{title}</p>

            <div className='btn-container'>
              <button
                className='check-btn'
                type='button'
                onClick={() => completeToggle(id)}
              >
                <FaCheckSquare />
              </button>
              <button
                className='edit-btn'
                type='button'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                className='delete-btn'
                type='button'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
