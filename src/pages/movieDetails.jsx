import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Play, Heart, X, Plus, ChevronRight } from "lucide-react";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useMovieStore } from "@/store/useMovieStore";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, trailerKey, recommendations, loading } = useMovieDetails(id);
  const { wishlist, toggleWishlist } = useMovieStore();
  const [showTrailer, setShowTrailer] = useState(false);

  if (loading)
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-primary text-5xl animate-pulse font-black italic">
          LOADING...
        </div>
      </div>
    );

  const isWishlisted = wishlist.some((m) => m.id === movie?.id);

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-primary">
      {/* 1. The Large Background Typography */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none">
        <h1 className="text-[30vw] font-black leading-none uppercase whitespace-nowrap -rotate-12 translate-y-1/4">
          {movie.title}
        </h1>
      </div>

      {/* 2. Main Action Area */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 ">
        {/* Left Side: Navigation & Poster Interaction */}
        <div className="lg:col-span-1 border-r border-white/5 flex lg:flex-col items-center py-8 gap-10">
          <button
            onClick={() => navigate(-1)}
            className="p-4 hover:bg-primary rounded-full transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="h-px w-10 lg:w-full lg:h-px bg-white/10" />
          <button
            onClick={() => toggleWishlist(movie)}
            className={`p-4 rounded-full border transition-all ${isWishlisted ? "bg-red-500 border-red-500" : "border-white/20 hover:border-primary"}`}
          >
            {isWishlisted ? <Heart fill="white" /> : <Plus />}
          </button>
        </div>

        {/* Center: Image Showcase & Floating Info */}
        <div className="lg:col-span-7 relative p-6 lg:p-12 flex items-center justify-center">
          <div className="relative w-full aspect-16/10 group">
            {/* The Main Image with a specialized frame */}
            <div className="absolute -inset-4 border border-white/5 rounded-[3rem] group-hover:inset-0 transition-all duration-700" />
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              className="w-full h-full object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              alt={movie.title}
            />

            {/* Floating Play Button */}
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary-rgb),0.5)] hover:scale-110 transition-transform active:scale-90 group/btn"
            >
              <Play
                fill="black"
                className="ml-1 group-hover/btn:scale-125 transition-transform"
                size={32}
              />
            </button>
          </div>

          {/* Floating Year/Rating Badge */}
          <div className="absolute bottom-20 left-20 bg-white p-8 rounded-3xl text-black rotate-[-5deg] shadow-2xl hidden xl:block">
            <div className="text-6xl font-black">
              {movie.vote_average.toFixed(1)}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-50 text-center">
              Score
            </div>
          </div>
        </div>

        {/* Right Side: Content & Typography */}
        <div className="lg:col-span-4 p-8 lg:p-16 pt-1 flex flex-col justify-center">
          <span className="text-primary font-mono mb-4 block tracking-[0.5em] uppercase text-sm">
            {movie.status} // {new Date(movie.release_date).getFullYear()}
          </span>
          <h2 className="text-5xl font-black italic uppercase leading-none mb-8 wrap-break-word">
            {movie.title}
          </h2>

          <div className="space-y-6 max-w-md">
            <p className="text-white/60 leading-relaxed text-lg italic">
              "{movie.tagline || "A cinematic masterpiece unveiled."}"
            </p>
            <p className="text-white font-light leading-relaxed">
              {movie.overview}
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex gap-4 items-center">
              <span className="w-12 h-px bg-white/20" />
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Specifications
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-[10px] border border-white/10 px-3 py-1 rounded-sm uppercase tracking-tighter hover:bg-white hover:text-black transition-colors cursor-default"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recommendations - Styled as a "Film Strip" */}
      <div className="py-16 px-12 border-t border-white/5">
        <header className="flex justify-between items-center mb-8 border-l-4 border-primary pl-4">
          <h2 className="text-3xl font-bold text-text-main uppercase tracking-tight">
            Recommendation
          </h2>
          <span className="text-sm font-medium text-text-main/50 uppercase tracking-widest">
            Releases
          </span>
        </header>
        <h3 className="text-9xl font-black opacity-5 mb-12 absolute -translate-y-1/2">
          NEXT
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommendations.slice(0, 6).map((rec) => (
            <Link
              key={rec.id}
              to={`/movie/${rec.id}`}
              className="group relative aspect-3/4 overflow-hidden rounded-xl"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                alt=""
              />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <span className="text-black font-black uppercase text-sm">
                  {rec.title}
                </span>
                <ChevronRight className="text-black mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trailer Modal (Minimalist) */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-200 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in-95 duration-300"
          onClick={() => setShowTrailer(false)}
        >
          {/* Header Info - Floating above the player */}
          <div className="w-full max-w-6xl mb-6 flex justify-between items-end animate-in slide-in-from-top-4 duration-500 delay-150">
            <div className="space-y-1">
              <h4 className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                Cinematic Preview
              </h4>
              <h2 className="text-white text-2xl font-black italic uppercase tracking-tighter">
                {movie.title}{" "}
                <span className="text-white/20 ml-2">// Official Trailer</span>
              </h2>
            </div>

            <button
              onClick={() => setShowTrailer(false)}
              className="group relative bg-white text-black p-5 rounded-full overflow-hidden transition-all hover:pr-16 active:scale-95"
            >
              <span className="relative z-10">
                <X size={24} strokeWidth={3} />
              </span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black uppercase opacity-0 group-hover:opacity-100 transition-all">
                Close
              </span>
            </button>
          </div>

          {/* Video Container - Styled as a Premium Display */}
          <div
            className="relative w-full max-w-6xl aspect-video bg-[#050505] rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 group"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Corner Accents */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl-md z-10" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br-md z-10" />

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0&showinfo=0&color=white`}
              title="YouTube video player"
              className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Footer Hint */}
          <div className="mt-8 text-white/20 font-mono text-[10px] uppercase tracking-widest animate-pulse">
            Press ESC to exit theater mode
          </div>
        </div>
      )}
    </div>
  );
}
