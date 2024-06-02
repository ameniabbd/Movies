import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Language: string;
  Year: string;
  Runtime: string;
  imdbRating: string;
  Type: string;
  Plot: string;
  Actors: string;
}

export const MovieDetailScreen: React.FC = () => {
  /** Hooks */
  const route = useRoute();
  const navigation = useNavigation();

  const [movie, setMovie] = useState<Movie | null>(null);
  /** UseEffect Funtion  */

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`https://www.omdbapi.com/?i=${route.params.movie.imdbID}&apikey=a8c3e3ce`);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [route.params.movie.imdbID]);

  return (
    <ScrollView style={styles.container}>
      {movie && (
        <>
          <View style={styles.header}>
            <FastImage source={{ uri: movie.Poster }} style={styles.backgroundImage} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>{"<"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.movieDetails}>
            <Text style={styles.movieTitle}>{movie.Title}</Text>
            <Text style={styles.movieInfo}>Language: {movie.Language}</Text>
            <Text style={styles.movieInfo}>Released: {movie.Year} • Runtime: {movie.Runtime}</Text>
            <Text style={styles.movieInfo}>Ratings: {movie.imdbRating}</Text>
            <Text style={styles.movieGenres}>{movie.Type.split(', ').join(' • ')}</Text>
            <Text style={styles.moviePlot}>{movie.Plot}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Cast</Text>
            <View style={styles.castItem}>
              <Text style={styles.castName}>{movie.Actors}</Text>
            </View>
          </View>
        
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    position: 'relative',
    height: 300,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  movieDetails: {
    padding: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  movieInfo: {
    fontSize: 14,
    color: 'lightgrey',
    marginVertical: 5,
  },
  movieGenres: {
    fontSize: 14,
    color: 'gold',
    marginVertical: 5,
  },
  moviePlot: {
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  castItem: {
    paddingHorizontal: 20,
  },
  castName: {
    color: 'white',
    marginTop: 5,
  },
});

