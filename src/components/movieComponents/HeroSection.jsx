import { Play, CalendarDays, Star, Plus, Search } from "lucide-react";

export const HeroSection = ({ movie, searchQuery, setSearchQuery }) => {
  if (!movie) return null;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-bg rounded-2xl">
      {/* Cinematic Background Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
          <div className="w-full max-w-[320px] shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full aspect-2/3 object-cover rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-8">
            {/* Search Bar Integration */}
            <div className="relative max-w-md mx-auto md:mx-0 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-main/40 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-elevated/50 backdrop-blur-md border border-white/10 rounded-2xl text-text-main placeholder:text-text-main/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-text-main tracking-tight italic uppercase">
                {movie.title}
              </h2>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
                <span className="flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">
                  <Star size={16} fill="currentColor" />
                  {movie.vote_average.toFixed(1)} Rating
                </span>
                <span className="flex items-center gap-2 text-text-main/60">
                  <CalendarDays size={16} />
                  {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </div>

            <p className="text-text-main/70 text-lg leading-relaxed max-w-2xl line-clamp-3">
              {movie.overview}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/25">
                <Play size={20} fill="white" /> Watch Trailer
              </button>
              <button className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md text-text-main font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Plus size={20} /> Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
