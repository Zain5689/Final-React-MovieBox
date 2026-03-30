import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useMovieStore } from "../../store/useMovieStore";

const MovieCard = ({ movie }) => {
  const { wishlist, toggleWishlist } = useMovieStore();
  const isFavorite = wishlist.some((m) => m.id === movie.id);

  return (
    <div className="group relative bg-surface-card rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 border border-surface-elevated">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-100 object-cover"
        />
      </Link>

      <button
        onClick={() => toggleWishlist(movie)}
        className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-all"
      >
        <Heart
          size={20}
          className={isFavorite ? "fill-primary text-primary" : "text-white"}
        />
      </button>

      <div className="p-4">
        <h3 className="font-bold text-text-main truncate">{movie.title}</h3>
        <p className="text-sm text-text-main/60">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
