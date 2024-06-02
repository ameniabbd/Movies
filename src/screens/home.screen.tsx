import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Size } from '../utils/size';
import SearchIcon from '../../resources/assets/Search.svg';
import { strings } from '../contexts/app.context';
import appColors from '../colors';
import { useNavigation } from '@react-navigation/native';

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

const HomeScreen: React.FC = () => {
  /** hooks */
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation: any = useNavigation();
/** UseEffect Function */
  useEffect(() => {
    fetchMovies();
  }, []);
/** Fetch data movies  Function */
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const popularResponse = await axios.get('https://www.omdbapi.com/?s=popular&apikey=a8c3e3ce');
      const topRatedResponse = await axios.get('https://www.omdbapi.com/?s=top_rated&apikey=a8c3e3ce');
      setPopularMovies(popularResponse.data.Search);
      setTopRatedMovies(topRatedResponse.data.Search);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
/** Handle Search Function */
const handleSearch = () => {
  navigation.navigate('Search');
};

/** Navigation to details movie Function */

const handleMoviePress = (movie: Movie) => {
  navigation.navigate('Details', { movie: movie });
};
  /** render item movies Function */
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <Text ellipsizeMode='tail' numberOfLines={2} style={styles.movieTitle}>{item.Title}</Text>
    </View>
    </TouchableOpacity>
  );

  /** Handle More Button PressFunction */
  const handleMorePress = () => {
    navigation.navigate('moreMovie');
  };


  return (
   
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{strings.title}</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
        placeholderTextColor={appColors.primary10}
          style={styles.searchBar}
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={handleSearch}
    
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
      <SearchIcon/>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFA500" />
        </View>
      ) : (
        <>
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{strings.rated}</Text>
            
          </View>
          <FlatList
            data={topRatedMovies}
            keyExtractor={(item) => item.imdbID}
            renderItem={renderMovieItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{strings.popular}</Text>
            <TouchableOpacity onPress={handleMorePress}>
              <Text style={styles.moreButton}>{strings.more}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularMovies}
            keyExtractor={(item) => item.imdbID}
            renderItem={renderMovieItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
          
        </>
      )}
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: Size(12),
    paddingVertical:Size(32)
    
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: Size(20),
    color: 'white',
  
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Size(24),
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  moreButton: {
    fontSize: 16,
    color: '#FFA500',
  },
  listContent: {
    paddingBottom: Size(10),
  },
  movieContainer: {
    marginRight: 10,
    width: 120,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default HomeScreen;
