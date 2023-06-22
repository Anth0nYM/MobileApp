import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { fetchRandomPokemon } from '../api';

const DetailsScreen = () => {
  const [pokemon, setPokemon] = useState(null);
const [error, setError] = useState(null);

  const handleFetchRandomPokemon = async () => {
    try {
      const randomPokemon = await fetchRandomPokemon();
      setPokemon(randomPokemon);
      setError(null);
    } catch (error) {
      console.log('Error fetching random Pokémon:', error);
      setError('Oops, looks like this pokemon is sleeping right now.');
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
        onPress={handleFetchRandomPokemon}
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

export default DetailsScreen;
