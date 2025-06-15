import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className = '', ariaLabel, ...props }) => (
  <button
    className={`relative overflow-hidden px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105 focus:scale-105 active:scale-95 ${className}`}
    aria-label={ariaLabel}
    tabIndex={0}
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute left-0 top-0 w-full h-full bg-blue-800 opacity-0 hover:opacity-10 transition-opacity duration-200" />
  </button>
);

export default AnimatedButton; 