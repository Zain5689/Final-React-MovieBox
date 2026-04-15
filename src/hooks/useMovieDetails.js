import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetailsAndTrailer = async () => {
      setLoading(true);
      try {
        // Fetch movie details
        const detailsRes = await axios.get(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
        );
        setMovie(detailsRes.data);

        // Fetch videos (trailers)
        const videosRes = await axios.get(
          `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
        );
        const trailer = videosRes.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );
        setTrailerKey(trailer ? trailer.key : null);

        // Fetch recommendations
        const recsRes = await axios.get(
          `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`,
        );
        setRecommendations(recsRes.data.results.slice(0, 10)); // limit to 10
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsAndTrailer();
  }, [movieId]);

  return { movie, trailerKey, recommendations, loading, error };
};
