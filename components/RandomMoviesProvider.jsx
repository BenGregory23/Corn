import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RandomMoviesContext = createContext();

const RandomMoviesProvider = ({ children, genres, count }) => {
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const apiKey = '42b8a7922cc2d03ed720a24cba029744';
        const genreQuery = genres.join('|');
        const apiUrl = `https://api.imdb.com/imdb/random/title?genres=${genreQuery}&api_key=${apiKey}`;

        // Check if movies are already cached
        const cachedMovies = await AsyncStorage.getItem('cachedMovies');
        if (cachedMovies) {
          const parsedCachedMovies = JSON.parse(cachedMovies);

          if (parsedCachedMovies.length >= count) {
            setRandomMovies(parsedCachedMovies.slice(0, count));
            return;
          }
        }

        const fetchedMovies = [];
        let remainingCount = count;

        while (remainingCount > 0) {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (response.ok) {
            const movie = {
              title: data.title,
              year: data.year,
              genres: data.genres,
              plot: data.plot,
              rating: data.rating,
            };

            fetchedMovies.push(movie);
            remainingCount--;
          } else {
            throw new Error(data.error);
          }
        }

        // Cache the fetched movies
        await AsyncStorage.setItem('cachedMovies', JSON.stringify(fetchedMovies));
        setRandomMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching random movies:', error);
      }
    };

    fetchRandomMovies();
  }, []);

  return (
    <RandomMoviesContext.Provider value={randomMovies}>
      {children}
    </RandomMoviesContext.Provider>
  );
};

export default RandomMoviesProvider;
