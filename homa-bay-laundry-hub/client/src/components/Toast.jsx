import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  let bg = 'bg-blue-600';
  if (type === 'success') bg = 'bg-green-600';
  if (type === 'error') bg = 'bg-red-600';

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded shadow-lg text-white font-semibold animate-fade-in ${bg}`}>
      {message}
    </div>
  );
};

export default Toast; 