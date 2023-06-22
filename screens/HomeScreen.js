import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchRandomPokemon } from '../api';

const HomeScreen = () => {
  const [pokemon, setPokemon] = useState(null);
  const [showShiny, setShowShiny] = useState(false);

  const handleToggleShiny = () => {
    setShowShiny(!showShiny);
  };

  const handleFetchRandomPokemon = async () => {
    try {
      const randomPokemon = await fetchRandomPokemon();
      setPokemon(randomPokemon);
    } catch (error) {
      console.log('Error fetching random Pokémon:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFetchRandomPokemon}>
          <Text style={styles.buttonText}>Get Random Pokémon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.shinyButton,
            { backgroundColor: showShiny ? 'red' : 'white' },
          ]}
          onPress={handleToggleShiny}
        >
          <Text style={styles.shinyButtonText}>Shiny</Text>
        </TouchableOpacity>
      </View>

      {pokemon && (
        <View style={styles.pokemonContainer}>
          <Image
            source={{ uri: showShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default }}
            style={styles.pokemonImage}
          />
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  shinyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shinyButtonText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pokemonContainer: {
    alignItems: 'center',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
