import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useMovieStore } from "@/store/useMovieStore";
import MovieHero from "@/components/movieDetailsComponents/MovieHero";
import MovieRecommendations from "@/components/movieDetailsComponents/Recommendation";
import TrailerModal from "@/components/movieDetailsComponents/Tailer";

// Components

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, trailerKey, recommendations, loading } = useMovieDetails(id);
  const { wishlist, toggleWishlist } = useMovieStore();
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading) return <LoadingScreen />;

  const isWishlisted = wishlist.some((m) => m.id === movie?.id);

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-primary bg-[#080808]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none">
        <h1 className="text-[30vw] font-black leading-none uppercase whitespace-nowrap -rotate-12 translate-y-1/4">
          {movie.title}
        </h1>
      </div>

      <MovieHero
        movie={movie}
        isWishlisted={isWishlisted}
        onBack={() => navigate(-1)}
        onToggleWishlist={() => toggleWishlist(movie)}
        onPlay={() => setShowTrailer(true)}
      />

      <MovieRecommendations recommendations={recommendations} />

      {showTrailer && (
        <TrailerModal
          trailerKey={trailerKey}
          title={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="h-screen bg-black flex items-center justify-center font-mono">
      <div className="text-primary text-5xl animate-pulse font-black italic">
        LOADING...
      </div>
    </div>
  );
}
