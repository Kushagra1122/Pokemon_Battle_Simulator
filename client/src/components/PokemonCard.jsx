// src/components/PokemonCard.jsx
import React from "react";

const PokemonCard = ({ pokemon, onSelect, isSelected, onShowModal }) => {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl ${
        isSelected ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
      onClick={() => onShowModal(pokemon)}
    >
      <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mb-2"
      />
      <div className="flex justify-between">
        <button
          className={`mt-2 px-4 py-2 rounded text-white transition duration-300 
            
             
            bg-blue-500 hover:bg-blue-600
          `}
          onClick={(e) => {
            e.stopPropagation();
            const audio = new Audio(
            pokemon.cries.latest
            );
            audio.play();
          }}
        >
          Play Cry
        </button>
        <button
          className={`mt-2 px-4 py-2 rounded text-white transition duration-300 ${
            isSelected
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from firing
            onSelect(pokemon);
          }}
        >
          {isSelected ? "Deselect" : "Select"}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
