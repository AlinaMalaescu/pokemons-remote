import React, { useState, useEffect } from 'react'
import state from './AtomStates';
import { useAtom } from 'jotai';

export default function PokemonEvolution({ url }) {
    console.log(url);

    const [pokemonData, setPokemonData] = useAtom(state.pokemonData);
    const [evolutionChain, setEvolutionChain] = useState(null);

     console.log(pokemonData);
    useEffect(() => {
        let obj = {}
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data.chain.evolves_to[0]) {
                    obj = {
                        first_evolution: [data.chain.evolves_to[0].species.name],
                        second_evolution: data.chain.evolves_to[0].evolves_to[0].species.name ?
                            [data.chain.evolves_to[0].evolves_to[0].species.name] : undefined
                    }
                    let fevolutionPhoto = pokemonData.filter(pokemon => pokemon.name === obj.first_evolution[0])
                    obj.first_evolution.push(fevolutionPhoto[0].photo)
                   
                    let sevolutionPhoto = pokemonData.filter(pokemon => pokemon.name === obj.second_evolution[0])
                    obj.second_evolution.push(sevolutionPhoto[0].photo)

                }
                setEvolutionChain(obj)
            })
    }, [])

    return (
        evolutionChain && <div className='PokemonChartEvolution'>
        {evolutionChain.first_evolution &&<div>
            <h1>{evolutionChain.first_evolution[0]}</h1>
            <img src={evolutionChain.first_evolution[1]}/>
            </div>}

        {evolutionChain.second_evolution && <div>
            <h1>{evolutionChain.second_evolution[0]}</h1>
            <img src={evolutionChain.second_evolution[1]}/>
            </div>}
        </div>
    )
}
