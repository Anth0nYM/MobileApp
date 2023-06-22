import axios from 'axios';

export const fetchRandomPokemon = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const { results } = response.data;
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomPokemon = results[randomIndex];

    const pokemonResponse = await axios.get(randomPokemon.url);
    return pokemonResponse.data;
  } catch (error) {
    console.log('Error fetching random Pokémon:', error);
    throw error;
  }
};
