import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number; // ms
}

interface NotificationContextType {
  notifications: Notification[];
  pushNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const pushNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
    if (notification.duration) {
      setTimeout(() => dismissNotification(id), notification.duration);
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 