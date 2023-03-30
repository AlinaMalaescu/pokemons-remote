import React, { useState, useEffect, useRef } from 'react'
import state from './AtomStates';
import { useAtom } from 'jotai';

export default function FightingPokemons({ pokemons, setPokemons }) {

    const [pokemonData, setPokemonData] = useAtom(state.pokemonData);
    const [fightersList, setFightersList] = useAtom(state.fightersList);
    const [fightingPokemons, setFightingPokemons] = useAtom(state.fightingPokemons);

    useEffect(() => {
        setFightingPokemons(pokemonData.filter(pokemon => pokemon.experience <= 70).sort((a, b) => (a.experience - b.experience)))

    }, [])

    const handleFighterClick = ({ target }) => {
  
        if (fightersList.length < 3) {
            let addedPokemon = fightingPokemons.filter(pokemon => pokemon.id === Number(target.id))[0];
            setFightersList(() => [...fightersList, addedPokemon]);
            console.log('miau');
            let newArray = fightingPokemons.filter(pokemon => pokemon.id !== Number(target.id));
            setFightingPokemons(newArray);

        }
    }

    return (
        pokemonData && fightingPokemons && <div className="fightersContainer" >
            <button onClick={() => setPokemons(false)}>BACK</button>
            {fightingPokemons && fightingPokemons.map((pokemon, index) => (<div className="fightersCart" key={index}>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.photo} />
                <h2>{pokemon.experience}</h2>
                <h3>HP:{pokemon.hp} / Attack: {pokemon.attack} /Defense: {pokemon.defense}</h3>
                <button id={pokemon.id} onClick={handleFighterClick} >Select {pokemon.name} </button>
            </div>
            ))}
        </div>
    )
}
