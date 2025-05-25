import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h3 className="font-bold text-xl">{title}</h3>
      <p>{description}</p>
      <button onClick={onClick} className="mt-2 text-blue-500">View Details</button>
    </div>
  );
};

export default Card;