import { useMovieStore } from "../store/useMovieStore";
import { Heart, Trash2, Film } from "lucide-react";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useMovieStore();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
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
          className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="relative aspect-2/3 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 linear-to-t from-black/90 via-black/20 to-transparent" />
            <button
              onClick={() => toggleWishlist(movie)}
              className="absolute top-3 right-3 p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-sm line-clamp-2">
              {movie.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
