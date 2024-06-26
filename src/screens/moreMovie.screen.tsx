import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { Size } from "../utils/size";
import Star from "../../resources/assets/star.svg";
import { useNavigation } from "@react-navigation/native";

import FastImage from "react-native-fast-image";
import { strings } from "../contexts/app.context";

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
};

const MoreScreen: React.FC = () => {
  /** Hooks */
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const navigation: any = useNavigation();


/** UseEffet Function */
  useEffect(() => {
    fetchMovies();
  }, [page]);
/** Fetech data movies  */
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=popular&page=${page}&apikey=a8c3e3ce`
      );
      const newMovies = response.data.Search;
      setTotalResults(response.data.totalResults);
      if (page === 1) {
        setMovies(newMovies);
      } else {
        setMovies([...movies, ...newMovies]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
/** Pagination Funtion */
  const handleEndReached = () => {
    if (movies.length < totalResults) {
      setPage(page + 1);
    }
  };
  /** Navigation to details movie Function */
  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("Details", { movie: movie });
  };
/** Render Items Movie */
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
      <View style={styles.movieContainer}>
        <FastImage
          source={{ uri: item.Poster }}
          style={styles.poster}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.movieInformation}>
          <Text ellipsizeMode="tail" style={styles.movieTitle}>
            {item?.Title}
          </Text>
          <Text style={styles.movieyear}>Year: {item.Year}</Text>
          <Text style={styles.movieType}>Type: {item?.Type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Movies</Text>

      </View>
    
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.imdbID}
        onEndReached={handleEndReached}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#FFA500" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingHorizontal: Size(16),
   
    paddingVertical: Size(50),
  },
  movieContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Size(10),
  },
  poster: {
    width: Size(100),
    height: Size(150),
    borderRadius: Size(10),
    marginRight: Size(10),
  },
  movieTitle: {
    fontSize: 16,
    flexWrap: "wrap",
    width: "70%",
    color: "#FFA500",
  },
  movieyear: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  movieType: {
    fontSize: 16,
    color: "#FFFFFF",
  },

  movieInformation: { width: "90%", paddingVertical: Size(12) },
  ratingContainer: { flexDirection: "row", alignItems: "center" },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: Size(24),
    color: "#FFFFFF",
  },
  backButton: {
    
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
    
    
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical:Size(12)
  },
  
});

export default MoreScreen;
