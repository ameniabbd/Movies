import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Size } from '../utils/size';
import SearchIcon from '../../resources/assets/Search.svg';
import appColors from '../colors';
import FastImage from 'react-native-fast-image';

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleSearch = async (text: string) => {
    setSearchQuery(text); // Met à jour le texte de recherche
    if (text.trim() === '') {
      setSearchResults([]); // Efface les résultats si la recherche est vide
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${text}&apikey=a8c3e3ce`);
      setSearchResults(response.data.Search || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('Details', { movie: movie });
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
      <View style={styles.movieContainer}>
        <FastImage source={{ uri: item.Poster }} style={styles.poster}  resizeMode={FastImage.resizeMode.cover} />
       
        <Text ellipsizeMode='tail' numberOfLines={2} style={styles.movieTitle}>{item.Title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchView}>
          <TextInput
            placeholderTextColor={appColors.primary10}
            style={styles.searchBar}
            placeholder="Search for movies..."
            value={searchQuery}
            onChangeText={handleSearch} // Appel de la fonction handleSearch à chaque changement
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: Size(12),
  },
  searchView: {
    flexDirection: 'row',
    marginVertical: Size(16),
    marginHorizontal: Size(12),
    alignItems: 'center',
  },
  searchBarContainer: {
    marginBottom: Size(20),
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 10,
    color: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchButton: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 10,
  },
  movieContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default SearchScreen;
