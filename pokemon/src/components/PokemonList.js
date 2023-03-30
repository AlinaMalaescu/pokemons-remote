import { useAtom } from 'jotai';
import state from './AtomStates';
// import Slider from "react-slick";
import React, {useState, useEffect} from 'react'
import PokemonDetail from './PokemonDetail';
import FightingPokemons from './FightingPokemons';


export default function PokemonList({library, setLibrary}) {

    const [pokemonInfo, setpokemonInfo] = useState(null);
    const [moreInfo, setmoreInfo] = useAtom(state.moreInfo);

    const [pokemonData, setPokemonData] = useAtom(state.pokemonData);

     
    const handleLearnButton = ({target}) => {
       
        let selectedPokemon = pokemonData.filter(pokemon => Number(pokemon.id) === Number(target.id));
         setpokemonInfo(selectedPokemon[0]);
         setmoreInfo(true); 
        }
                                              
  return (pokemonData && pokemonInfo && moreInfo? <PokemonDetail pokemonInfo={pokemonInfo}/> : pokemonData &&<><button onClick={()=> {setLibrary(false)}}><img className="pokemonImage" src="https://d29fhpw069ctt2.cloudfront.net/icon/image/39096/preview.png"/><br></br>BACK TO MAIN PAGE</button> {pokemonData.map(({name, photo}, index) => (
    <div className="pokemonCart" key={index}>
    <h1>{name}</h1> 
    <img className="pokemonImage" src={photo}/>
    <button className="libraryBtn" id={index +1} onClick={handleLearnButton}>Learn about {name} </button>
   </div>
   ))}
   </>
  )
}
