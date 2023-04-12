import { atom } from 'jotai';
import { atomWithStorage } from "jotai/utils"

const pokemonData = atomWithStorage("pokemonData", [])

const state = {
    moreInfo: atom(false),
    pokemonData,
    fightersList: atom([]),
    fightingPokemons: atom([]),
    loggedPlayer: atom(null)
}

export default state
