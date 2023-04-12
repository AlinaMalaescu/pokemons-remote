import './App.css';
import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai';
import state from './components/AtomStates';

import PokemonList from './components/PokemonList';
import Locations from './components/Locations';
import FightingPokemons from './components/FightingPokemons';
import LoginForm from './assets/LoginForm';


function App() {

  const [library, setLibrary] = useState(false);
  const [location, setLocation] = useState(false);
  const [pokemons, setPokemons] = useState(false);
  const [login, showLogin] = useState(false);

  const [pokemonData, setPokemonData] = useAtom(state.pokemonData);
  const [loggedPlayer, setLoggedPLayer] = useAtom(state.loggedPlayer);

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

  const handleLogin = (e) => {
    e.preventDefault();
     let user = e.target.parentElement.querySelectorAll('input')[0].value;
     let password = e.target.parentElement.querySelectorAll('input')[1].value;

      let data = {
        'user': user,
        'password': password,
      }

     fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.response === 'case1') window.alert('Add a password')
        else if (data.response === 'case2') window.alert('User not found')
        else if (data.response === 'case3') window.alert('Wrong password')
        else {
          setLoggedPLayer(data);
          showLogin(false)}})
      .catch(error => {
      console.log(error);
      });
  }

  const handleSignUp = (e) => {
    e.preventDefault();

    let user = e.target.parentElement.querySelectorAll('input')[0].value;
    let email = e.target.parentElement.querySelectorAll('input')[1].value;
    let password = e.target.parentElement.querySelectorAll('input')[2].value;

    let data = {
      'user': user,
      'email': email,
      'password': password,
      'pokemons': [],
      'experience': 70,
      'createdAt': Date.now()
    }

  console.log(data);

    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .catch(error => {
      console.log(error);
      });
  }

  return (
    pokemonData && <div className="App">
      {!login && !library && !location && !pokemons &&
        <div className="buttonsContainer">
          <button className="homeBtns1" onClick={() => setPokemons(true)}>Select Your Pokemons</button>
          <button className="homeBtns2" onClick={() => setLocation(true)}>Select Location</button>
          <button className="homeBtns3" onClick={() => setLibrary(true)}>Pokemon Library</button>
          <button onClick={() => showLogin(true)}>LOGIN</button>
        </div>
      }
      {login && <LoginForm handleLogin={handleLogin} handleSignUp={handleSignUp}/>}
      {!login && library && <div className="containerPokemon"><PokemonList library={library} setLibrary={setLibrary} pokemons={pokemons} setPokemons={setPokemons} /></div>}
      {!login && location && <Locations />}
      {!login && pokemons && <FightingPokemons pokemons={pokemons} setPokemons={setPokemons} />}

    </div>
  );
}

export default App;
