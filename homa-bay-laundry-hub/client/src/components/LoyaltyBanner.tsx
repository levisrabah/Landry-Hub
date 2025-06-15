import React from 'react';

interface LoyaltyBannerProps {
  points?: number;
  discount?: number;
}

const LoyaltyBanner: React.FC<LoyaltyBannerProps> = ({ points, discount }) => (
  <div className="flex items-center bg-gradient-to-r from-blue-400 to-green-300 text-white rounded-lg p-3 shadow mb-4 animate-fade-in">
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" />
    </svg>
    <span className="font-semibold text-lg">Loyalty Rewards:</span>
    {points !== undefined && <span className="ml-2">{points} points</span>}
    {discount !== undefined && <span className="ml-2">{discount}% discount</span>}
  </div>
);

export default LoyaltyBanner; 