import { useMovieStore } from "../store/useMovieStore";
import { Heart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useMovieStore();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-main/50">
        <Heart size={80} className="mb-4 opacity-20" />
        <p className="text-xl font-bold">Your wishlist is empty</p>{" "}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {wishlist.map((movie) => (
        <div
          key={movie.id}
          className="bg-surface-card rounded-xl overflow-hidden shadow-lg border border-surface-elevated"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-bold truncate text-text-main">{movie.title}</h3>
            <button
              onClick={() => {
                toggleWishlist(movie);
                toast.success("Removed from wishlist");
              }}
              className="text-primary hover:scale-110 transition-transform"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
