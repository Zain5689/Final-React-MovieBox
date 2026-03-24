import { useState, useEffect } from "react";
import axios from "axios";
import { Api } from "@/data/API";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Axios automatically parses the JSON, so we just destructure 'data'
        const { data } = await axios.get(Api);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies with Axios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-slate-600 font-medium">
          Loading Movies...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 underline decoration-indigo-500 underline-offset-8">
        Now Playing
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-slate-200 aspect-[2/3] shadow-sm group-hover:shadow-lg transition-shadow duration-300">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded">
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
            <h3 className="mt-3 font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
              {movie.title}
            </h3>
            <p className="text-sm text-slate-500">
              {movie.release_date?.split("-")[0] || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
