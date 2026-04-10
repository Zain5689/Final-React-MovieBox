import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const useMovies = (page = 1) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const nowPlayingRes = await axios.get(
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`,
        );
        setMovies(nowPlayingRes.data.results);
        setTotalPages(nowPlayingRes.data.total_pages);

        if (page === 1 && !heroMovie) {
          const popularRes = await axios.get(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
          );
          setHeroMovie(popularRes.data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, totalPages, heroMovie, loading };
};
