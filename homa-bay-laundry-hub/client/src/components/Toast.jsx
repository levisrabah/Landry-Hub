import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded shadow-md">
      {message}
      <button onClick={onClose} className="ml-2 text-sm">Close</button>
    </div>
  );
};

export default Toast;