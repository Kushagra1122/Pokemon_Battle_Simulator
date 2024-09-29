// src/utils/battleLogic.js

const calculateTypeEffectiveness = (moveType, opponentTypes) => {
    // A simple type effectiveness map, 1 is neutral, 2 is super effective, 0.5 is not very effective
    const effectivenessMap = {
        normal: { rock: 0.5, ghost: 0, steel: 0.5 },
        fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
        water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
        // Add all types here...
    };

    return opponentTypes.reduce((multiplier, type) => {
        return multiplier * (effectivenessMap[moveType]?.[type] || 1);
    }, 1);
};

const calculateDamage = (attacker, defender, move) => {
    const level = 50; // Pokémon level for simulation
    const attackStat = attacker.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defenseStat = defender.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const movePower = move.power || 40; // If move power is null, use a default value

    // Calculate type effectiveness
    const typeEffectiveness = calculateTypeEffectiveness(move.type.name, defender.types.map(typeInfo => typeInfo.type.name));

    // Damage formula calculation
    const damage = Math.floor(((2 * level / 5 + 2) * movePower * attackStat / defenseStat) / 50 + 2) * typeEffectiveness;

    return damage;
};

const selectRandomMove = (pokemon) => {
    const moves = pokemon.moves.filter(move => move.move.power !== null);
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex].move;
};

const determineOrder = (pokemon1, pokemon2) => {
    const speed1 = pokemon1.stats.find(stat => stat.stat.name === 'speed').base_stat;
    const speed2 = pokemon2.stats.find(stat => stat.stat.name === 'speed').base_stat;

    if (speed1 > speed2) return [pokemon1, pokemon2];
    if (speed1 < speed2) return [pokemon2, pokemon1];

    // If speeds are equal, randomize the order
    return Math.random() > 0.5 ? [pokemon1, pokemon2] : [pokemon2, pokemon1];
};

const simulateBattle = (pokemon1, pokemon2) => {
    let hp1 = pokemon1.stats.find(stat => stat.stat.name === 'hp').base_stat;
    let hp2 = pokemon2.stats.find(stat => stat.stat.name === 'hp').base_stat;

    const battleLog = [];
    const [first, second] = determineOrder(pokemon1, pokemon2);

    while (hp1 > 0 && hp2 > 0) {
        const move1 = selectRandomMove(first);
        const move2 = selectRandomMove(second);

        const damage1 = calculateDamage(first, second, move1);
        hp2 -= damage1;

        battleLog.push(`${first.name} used ${move1.name}. It did ${damage1} damage!`);
        if (hp2 <= 0) {
            battleLog.push(`${second.name} fainted!`);
            return { winner: first, log: battleLog };
        }

        const damage2 = calculateDamage(second, first, move2);
        hp1 -= damage2;

        battleLog.push(`${second.name} used ${move2.name}. It did ${damage2} damage!`);
        if (hp1 <= 0) {
            battleLog.push(`${first.name} fainted!`);
            return { winner: second, log: battleLog };
        }
    }
};

export { simulateBattle };

