// src/App.jsx
import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import BattleSummary from "./components/BattleSummary";
 // Add your sound file in the `sounds` folder

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const promises = [];
      for (let i = 1; i <= 15; i++) {
        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) =>
            res.json()
          )
        );
      }
      const results = await Promise.all(promises);
      setPokemonList(results);
    };
    fetchPokemonData();
  }, []);

  const handleSelectPokemon = (pokemon) => {
    if (selectedPokemon.includes(pokemon)) {
      setSelectedPokemon(selectedPokemon.filter((p) => p !== pokemon));
    } else if (selectedPokemon.length < 2) {
      setSelectedPokemon([...selectedPokemon, pokemon]);
    }
  };

  const handleShowModal = (pokemon) => {
    setCurrentPokemon(pokemon);
    setShowModal(true);
  };

  const initiateBattle = () => {
    const [pokemon1, pokemon2] = selectedPokemon;

    // Example battle logic
    const damage1 = calculateDamage(pokemon1, pokemon2);
    const damage2 = calculateDamage(pokemon2, pokemon1);

    const winner = damage1 > damage2 ? pokemon1 : pokemon2;
    const moves = [
      `${pokemon1.name} dealt ${damage1} damage`,
      `${pokemon2.name} dealt ${damage2} damage`,
    ];

 ;

    setBattleResult({ winner, moves });
  };

  const calculateDamage = (attacker, defender) => {
    const level = 50;
    const basePower = Math.floor(Math.random() * 100) + 20; // Random move power
    const attack = attacker.stats[1].base_stat; // Attack stat
    const defense = defender.stats[2].base_stat; // Defense stat
    const typeEffectiveness = 1; // You can implement type effectiveness logic here
    return Math.floor(
      ((level * (basePower + attack)) / defense) * typeEffectiveness
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon Battle Simulator</h1>

      {/* Display Pokémon Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={handleSelectPokemon}
            isSelected={selectedPokemon.includes(pokemon)}
            onShowModal={handleShowModal}
          />
        ))}
      </div>

      {/* Initiate Battle Button */}
      {selectedPokemon.length === 2 && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded transition duration-300 hover:bg-green-600"
          onClick={initiateBattle}
        >
          Battle
        </button>
      )}

      {/* Pokémon Detail Modal */}
      {showModal && currentPokemon && (
        <PokemonModal
          pokemon={currentPokemon}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Battle Summary */}
      {battleResult && (
        <BattleSummary
          winner={battleResult.winner}
          moves={battleResult.moves}
          onClose={() => setBattleResult(null)}
        />
      )}
    </div>
  );
};

export default App;
