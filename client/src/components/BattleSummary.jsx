// src/components/BattleSummary.jsx
import React from "react";

const BattleSummary = ({ winner, moves, onClose }) => {
    console.log(moves)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-2">Battle Summary</h2>
        <p className="font-semibold">Winner: {winner.name}</p>
        <p>Moves used:</p>
        <ul className="list-disc list-inside">
          {moves.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BattleSummary;
