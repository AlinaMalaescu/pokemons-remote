import React, {useState, useEffect,useRef} from 'react'
import { useAtom } from 'jotai';
import state from './AtomStates';

export default function LocationDetail({locationsList, selectedLocation}) {

    const [opponentPokemon, setopponentPokemon] = useState({});

    // const [pokemonData, setPokemonData] = useAtom(state.pokemonData);
    const [fightersList, setFightersList] = useAtom(state.fightersList);
    // const [fightingPokemons, setFightingPokemons] = useAtom(state.fightingPokemons);
    const [selectedPLayer, setSelectedPlayer] = useState(null);
    const [hp, setHp] = useState({})
    const [turn, setTurn] = useState('player');
    const [gameStatus, setGameStatus] = useState(null);
    const [gameOver, setGameOver] = useState(null);
    const enemyRef = useRef(null)
    const playerRef = useRef(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/location-area/${selectedLocation}/`)
        .then(response => response.json())
        .then(response =>  { 
            console.log(response["pokemon_encounters"]);
        const randomPokemonIndex = Math.floor(Math.random() * response["pokemon_encounters"].length);
        const randomPokemon = response["pokemon_encounters"][randomPokemonIndex].pokemon;
            
          fetch(`${randomPokemon.url}`)
            .then(response => response.json())
            .then(response => {
                let obj = {
                    name: response.name,
                    photo: response.sprites.other.dream_world.front_default,
                    hp: response.stats[0].base_stat,
                    attack: response.stats[1].base_stat,
                    defense: response.stats[2].base_stat}
                    console.log(obj);
                    setHp({...hp, enemy: obj.hp})
                setopponentPokemon(obj)})
    })
    }, [])


    const selectFighter = ({target}) => {
        const selectedFighter = fightersList.filter(fighter => fighter.name === target.id )[0]
        setSelectedPlayer(selectedFighter)
        setHp({...hp, player: selectedFighter.hp})
        setGameStatus(null);
    }

    const handleFight = ({target}) => {
      if (target.innerText === 'Start fight!') {
        target.innerText = 'Attack';}
      else { 
        if (turn === 'player') {
        let damage =  ((((2/5+2)*selectedPLayer.attack*60/opponentPokemon.defense)/50)+2)*Math.floor(Math.random()*(255-217 +1)+ 217)/255; 
         let newValue = Math.round(opponentPokemon.hp - damage);
         if (newValue <= 0) {console.log('You won!');
        enemyRef.current.value =0;
        setGameStatus('won');
        return;}
         setopponentPokemon({...opponentPokemon, hp: newValue });
         enemyRef.current.value = newValue;
         setTurn('opponent');
        } else {
            let damage =  ((((2/5+2)*opponentPokemon.attack*60/selectedPLayer.defense)/50)+2)*Math.floor(Math.random()*(255-217 +1)+ 217)/255; 
            let newValue = Math.round(selectedPLayer.hp - damage);
            if (newValue <= 0) {
                console.log('You lost!');
                playerRef.current.value= 0; 
                setGameStatus('loss');
            let removePokemon = fightersList.filter(pokemon => pokemon.id !== selectedPLayer.id);
            if (removePokemon.length === 0) setGameOver(true);
            setFightersList(removePokemon);
            return;}
            setSelectedPlayer({...selectedPLayer, hp: newValue});
            playerRef.current.value = newValue
            setTurn('player');
         }
         console.log(`Opponent: ${opponentPokemon.hp}`);
         console.log(`Your score: ${selectedPLayer.hp}`) }
    }

  return (
    opponentPokemon && fightersList && !gameOver? 
    <div className="Battle">
        
        <h1 id="locationName">{locationsList[selectedLocation -1].name.toUpperCase()}</h1>
        {gameStatus === 'won' && <h1 className="won">YOU WON!</h1>}
        {gameStatus === 'loss' && <h1 className="won">YOU LOST!</h1>}
        {!gameStatus && <button onClick={handleFight}>Start fight!</button>}

        <div className='yourPlayers'>
            {fightersList.map((fighter, index) => {

                return <div key={index}>
                    <h4>{fighter.name}</h4>
                    <img src={fighter.photo}></img>
                    <h5>HP:{fighter.hp} A:{fighter.attack} D:{fighter.defense}</h5>
                    <button id={fighter.name} onClick={selectFighter}>Choose</button>
                </div>
            })}
        </div>

        <div className="opponent">
            <progress max={hp.enemy} value={opponentPokemon.hp*1} ref={enemyRef} />
            <h2>{opponentPokemon.name}</h2>
            <img src={opponentPokemon.photo} />

        </div>
        {selectedPLayer && <div className='selectedPlayer'>
        <progress max={hp.player} value={selectedPLayer.hp} ref={playerRef} />
            <h1>{selectedPLayer.name}</h1>
            <img src={selectedPLayer.photo}></img>
            </div>}

    </div> : <div className='gameover'><h1 id="gamoverH">GAME OVER!</h1></div>
  )
}
