import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const typeStyles: Record<string, string> = {
  success: 'bg-green-100 border-green-400 text-green-800',
  error: 'bg-red-100 border-red-400 text-red-800',
  info: 'bg-blue-100 border-blue-400 text-blue-800',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
};

const NotificationBanner: React.FC = () => {
  const { notifications, dismissNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-md" aria-live="polite">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`border-l-4 p-4 shadow-md rounded-md flex items-center justify-between ${typeStyles[n.type]} animate-fade-in`}
          role="alert"
        >
          <span>{n.message}</span>
          <button
            className="ml-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Dismiss notification"
            onClick={() => dismissNotification(n.id)}
            tabIndex={0}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner; 