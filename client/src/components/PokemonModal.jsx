// src/components/PokemonModal.jsx
import React, { useEffect, useState } from "react";

const PokemonModal = ({ pokemon, onClose }) => {
  const [extraData, setExtraData] = useState(null);

  useEffect(() => {
    const fetchExtraData = async () => {
      // Fetch Pokémon species data to get color, shape, location, and egg groups
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
      );
      const speciesData = await response.json();
      setExtraData(speciesData);
    };
    fetchExtraData();
  }, [pokemon]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-2">{pokemon.name}</h2>
        <p>
          <strong>Height:</strong> {pokemon.height / 10} m
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight / 10} kg
        </p>
        <p>
          <strong>HP:</strong> {pokemon.stats[0].base_stat}
        </p>
        <p>
          <strong>Attack:</strong> {pokemon.stats[1].base_stat}
        </p>
        <p>
          <strong>Defense:</strong> {pokemon.stats[2].base_stat}
        </p>
        <p>
          <strong>Speed:</strong> {pokemon.stats[5].base_stat}
        </p>
        <p>
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </p>
        <p>
          <strong>Types:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
        <p>
          <strong>Moves:</strong>{" "}
          {pokemon.moves
            .slice(0, 5)
            .map((m) => m.move.name)
            .join(", ")}
        </p>

        {/* Add Color, Shape, Location, and Egg Groups */}
        {extraData && (
          <>
            <p>
              <strong>Color:</strong> {extraData.color.name}
            </p>
            <p>
              <strong>Shape:</strong> {extraData.shape.name}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {extraData.habitat ? extraData.habitat.name : "Unknown"}
            </p>
            <p>
              <strong>Egg Groups:</strong>{" "}
              {extraData.egg_groups.map((egg) => egg.name).join(", ")}
            </p>
          </>
        )}

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

export default PokemonModal;
