import React from 'react';

const CompletedButton = ({ toggleCompleteTask, id, completed }) => {
  return (
    <button onClick={() => toggleCompleteTask(id)} className="z-20">
      {completed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="w-5 h-5 text-blue-500"
        >
          <path d="M16 2.667L5.833 14 0 8.167l1.666-1.666 4.167 4.167L14.333 1 16 2.667z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m15 0c0-4.142-3.358-7.5-7.5-7.5S4.5 7.858 4.5 12s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5zm0 0H8.25"
          />
        </svg>
      )}
    </button>
  );
};

export default CompletedButton;
