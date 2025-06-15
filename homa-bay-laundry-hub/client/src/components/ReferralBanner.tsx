import React from 'react';

interface ReferralBannerProps {
  code: string;
  bonus?: string;
}

const ReferralBanner: React.FC<ReferralBannerProps> = ({ code, bonus }) => (
  <div className="flex items-center bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg p-3 shadow mb-4 animate-fade-in">
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v10m0 0H9m6 0a2 2 0 002-2v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z" />
    </svg>
    <span className="font-semibold text-lg">Referral Bonus:</span>
    <span className="ml-2">Code: <span className="font-mono bg-white bg-opacity-20 px-2 py-1 rounded">{code}</span></span>
    {bonus && <span className="ml-2">({bonus})</span>}
  </div>
);

export default ReferralBanner; 