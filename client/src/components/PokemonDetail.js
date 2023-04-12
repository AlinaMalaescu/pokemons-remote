import React, { useState, useEffect } from 'react'
import PokemonEvolution from './PokemonEvolution'
import state from './AtomStates';
import { useAtom } from 'jotai';

export default function PokemonDetail({ pokemonInfo }) {
    // console.log(pokemonInfo);

    const [details, setdetails] = useState(null);
    const [moreInfo, setmoreInfo] = useAtom(state.moreInfo)

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInfo.name}`)
            .then(response => response.json())
            .then(data => {
                setdetails(data);
            })
    }, [])

    let sum = pokemonInfo.hp + pokemonInfo.attack + pokemonInfo.defense + pokemonInfo.special_attack + pokemonInfo.special_defense + pokemonInfo.speed;
   

    return (details &&
        <div className="container">
            <h1>{pokemonInfo.name.toUpperCase()}</h1>
            <img src={pokemonInfo.photo} />
            <p>{details["flavor_text_entries"][0]["flavor_text"]}</p>
            <div className="generalInfo">
                <h2>General Info</h2>
                <h3>Experience: {pokemonInfo.experience}</h3>
                <h4>Height: {pokemonInfo.height}</h4>
                <h4>Weight: {pokemonInfo.weight}</h4>
                <h4>Happiness: {details["base_happiness"]}</h4>
                <h4>Generation: {details.generation.name}</h4>
                <h4>Growth rate: {details["growth_rate"].name}</h4>
                <h4>Habitat:  {details.habitat.name} </h4>

                {/* {console.log(details, moreInfo)}  */}
            </div>
            <div>
                <table>
                    <thead>
                        <th>HP </th>
                        <th>Attack </th>
                        <th>Defense </th>
                        <th>Sp. Attack </th>
                        <th>Sp. Defense </th>
                        <th>Speed</th>
                    </thead>
                    <tbody>
                        <tr><td>{pokemonInfo.hp}</td><td>{pokemonInfo.attack}</td><td>{pokemonInfo.defense}</td><td>{pokemonInfo.special_attack}</td><td>{pokemonInfo.special_defense}</td><td>{pokemonInfo.speed}</td></tr><tr><td></td><td></td><td></td><td></td><td>Total:</td><td>{sum}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className='evolutionTitle'>Pokemon Evolution</h2>
                <PokemonEvolution url={details.evolution_chain.url} /></div> 
            <button onClick={() => {setmoreInfo(false)}}>BACK</button>
        </div>
    )
}
