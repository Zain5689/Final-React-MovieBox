import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/movieComponents/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const apiKey = "392e7da67e8860f48faaf7ea3b1d1599";

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [page]);

  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">Now Playing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
