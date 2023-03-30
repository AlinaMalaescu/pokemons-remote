import './App.css';
import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai';
import state from './components/AtomStates';

import PokemonList from './components/PokemonList';
import Locations from './components/Locations';
import FightingPokemons from './components/FightingPokemons';


function App() {

  const [library, setLibrary] = useState(false);
  const [location, setLocation] = useState(false);
  const [pokemons, setPokemons] = useState(false);

  const [pokemonData, setPokemonData] = useAtom(state.pokemonData);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      const pokemonArray = [];

      for (let i = 1; i <= 263; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          let obj;

          const evolutionsReq = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`);
          let evolutions;
          if (evolutionsReq.ok) evolutions = await evolutionsReq.json()

          pokemonArray.push({
            name: data.name,
            id: data.id,
            photo: data.sprites.other.dream_world.front_default,
            experience: data.base_experience,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special_attack: data.stats[3].base_stat,
            special_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.height,
            evolutions: [evolutions?.chain?.evolves_to[0]?.species?.name, evolutions?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name]
          });
        }
      }
      // console.log(pokemonArray);
      setPokemonData(pokemonArray);
    };

    fetchAllPokemon();
  }, []);

  return (
    pokemonData && <div className="App">
      {!library && !location && !pokemons &&
        <div className="buttonsContainer">
          <button className="homeBtns1" onClick={() => setPokemons(true)}>Select Your Pokemons</button>
          <button className="homeBtns2" onClick={() => setLocation(true)}>Select Location</button>
          <button className="homeBtns3" onClick={() => setLibrary(true)}>Pokemon Library</button>
        </div>
      }
      {library && <div className="containerPokemon"><PokemonList library={library} setLibrary={setLibrary} pokemons={pokemons} setPokemons={setPokemons} /></div>}
      {location && <Locations />}
      {pokemons && <FightingPokemons pokemons={pokemons} setPokemons={setPokemons} />}

    </div>
  );
}

export default App;
