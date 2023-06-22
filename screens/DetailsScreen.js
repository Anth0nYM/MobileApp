import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [pokemon, setPokemon] = useState(null);

  const fetchRandomPokemon = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const { results } = response.data;
      const randomIndex = Math.floor(Math.random() * results.length);
      const randomPokemon = results[randomIndex];

      const pokemonResponse = await axios.get(randomPokemon.url);
      setPokemon(pokemonResponse.data);
    } catch (error) {
      console.log('Error fetching random Pokémon:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          borderRadius: 20,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={fetchRandomPokemon}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Get Random Pokémon</Text>
      </TouchableOpacity>

      {pokemon && (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            {pokemon.name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
