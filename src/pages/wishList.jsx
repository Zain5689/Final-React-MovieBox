import { useMovieStore } from "../store/useMovieStore";
import { Heart, Trash2, Film } from "lucide-react";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useMovieStore();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-text-main/40">
        <div className="relative mb-6">
          <Heart size={100} className="opacity-10 animate-pulse" />
          <Film size={40} className="absolute inset-0 m-auto opacity-20" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Your wishlist is empty
        </h2>
        <p className="mt-2 text-sm italic">
          Start exploring and save your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-2">
      {wishlist.map((movie) => (
        <div
          key={movie.id}
          className="group relative bg-surface-card rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 border border-white/5"
        >
          {/* Image Container */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Quick Action Button */}
            <button
              onClick={() => {
                toggleWishlist(movie);
                toast.success("Removed from wishlist", {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
              className="absolute top-3 right-3 p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-red-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-500 hover:text-white"
              title="Remove from wishlist"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Details Overlay (Always Visible but pops on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300">
            <h3 className="font-bold text-white text-sm md:text-base leading-tight drop-shadow-lg line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary rounded border border-primary/30 uppercase tracking-tighter">
                Movie
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
