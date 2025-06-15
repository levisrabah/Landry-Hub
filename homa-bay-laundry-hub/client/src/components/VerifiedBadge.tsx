import React from 'react';

const VerifiedBadge: React.FC = () => (
  <span
    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs ml-1"
    title="Verified Provider"
    aria-label="Verified Provider"
  >
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

export default VerifiedBadge; 