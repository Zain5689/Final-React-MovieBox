import { useState } from "react";
import { Play, Heart, Star } from "lucide-react";

export const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-surface"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Icon - Always on top */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isWishlisted
            ? "bg-primary text-white scale-110"
            : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
        }`}
      >
        <Heart
          size={18}
          fill={isWishlisted ? "currentColor" : "none"}
          className={isWishlisted ? "animate-in zoom-in duration-300" : ""}
        />
      </button>

      {/* Image Poster */}
      <div className="aspect-2/3">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay Details */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent transition-opacity duration-300 flex flex-col justify-end ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg line-clamp-1 mb-1">{movie.title}</h3>

          <div className="flex items-center gap-3 mb-3 text-sm">
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              <Star size={14} fill="currentColor" />{" "}
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-white/60">
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2.5 rounded-xl transition-all active:scale-95 shadow-lg">
            <Play size={16} fill="white" /> Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};
