import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Play, CalendarDays, Star, Plus, Search } from "lucide-react";

export const HeroSection = ({ movie }) => {
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // يمنع إعادة تحميل الصفحة
    if (localQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  if (!movie) return null;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-bg rounded-2xl">
      <div className="absolute inset-0 z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover opacity-60"
          alt=""
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto">
          <div className="w-full max-w-[320px] shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full aspect-2/3 object-cover rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-8">
            {/* نموذج البحث */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-md mx-auto md:mx-0 group"
            >
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-main/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Type and press Enter to search..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-elevated/50 backdrop-blur-md border border-white/10 rounded-2xl text-text-main focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </form>

            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-text-main uppercase italic">
                {movie.title}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
                <span className="flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">
                  <Star size={16} fill="currentColor" />{" "}
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="flex items-center gap-2 text-text-main/60">
                  <CalendarDays size={16} /> {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </div>

            <p className="text-text-main/70 text-lg leading-relaxed line-clamp-3">
              {movie.overview}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-2">
                <Play size={20} fill="white" /> Watch Trailer
              </button>
              <button className="px-8 py-4 bg-white/5 text-text-main font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
                <Plus size={20} /> Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
