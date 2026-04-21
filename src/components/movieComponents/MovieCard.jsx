import { useState } from "react";
import { Play, Heart, Star } from "lucide-react";
import { useMovieStore } from "@/store/useMovieStore";
import { Link, useNavigate } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { wishlist, toggleWishlist, user } = useMovieStore();
  const navigate = useNavigate();

  const isWishlisted = wishlist.some((m) => m.id === movie.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    toggleWishlist(movie);
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isWishlisted
            ? "bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/40"
            : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
        }`}
      >
        <Heart
          size={18}
          fill={isWishlisted ? "currentColor" : "none"}
          className={isWishlisted ? "animate-in zoom-in duration-300" : ""}
        />
      </button>

      {/* Poster Image */}
      <div className="aspect-2/3">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Overlay Details */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-300 flex flex-col justify-end ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg line-clamp-1 mb-1 tracking-tight">
            {movie.title}
          </h3>

          <div className="flex items-center gap-3 mb-3 text-sm">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star size={14} fill="currentColor" />
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-slate-400 font-medium">
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>

          <Link
            to={`/movie/${movie.id}`}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <Play size={16} fill="white" /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
