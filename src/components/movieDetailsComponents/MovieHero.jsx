import { ArrowLeft, Play, Heart, Plus } from "lucide-react";

export default function MovieHero({
  movie,
  isWishlisted,
  onBack,
  onToggleWishlist,
  onPlay,
}) {
  return (
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 border-r border-white/5 flex lg:flex-col items-center py-8 gap-10">
        <button
          onClick={onBack}
          className="p-4 hover:bg-primary rounded-full transition-colors group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="h-px w-10 lg:w-full lg:h-px bg-white/10" />
        <button
          onClick={onToggleWishlist}
          className={`p-4 rounded-full border transition-all ${isWishlisted ? "bg-red-500 border-red-500" : "border-white/20 hover:border-primary"}`}
        >
          {isWishlisted ? <Heart fill="white" /> : <Plus />}
        </button>
      </div>

      {/* Movie Image Container */}
      <div className="lg:col-span-7 relative p-6 lg:p-12 flex items-center justify-center">
        <div className="relative w-full aspect-16/10 group">
          <div className="absolute -inset-4 border border-white/5 rounded-[3rem] transition-all duration-700" />
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="w-full h-full object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000"
            alt={movie.title}
          />
          <button
            onClick={onPlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          >
            <Play fill="black" size={32} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Content Side */}
      <div className="lg:col-span-4 p-8 lg:p-16 pt-1 flex flex-col justify-center">
        <span className="text-primary font-mono mb-4 block tracking-[0.5em] uppercase text-sm">
          {movie.status} // {new Date(movie.release_date).getFullYear()}
        </span>
        <h2 className="text-5xl font-black italic uppercase leading-none mb-8">
          {movie.title}
        </h2>
        <div className="space-y-6 max-w-md">
          <p className="text-white/60 text-lg italic ">"{movie.tagline}"</p>
          <p className="text-white font-light">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
