import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { Loader2, Film, Star, Play, Calendar } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`,
        );
        setResults(res.data.results.filter((item) => item.poster_path));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-4">
        <div className="relative">
          <Loader2 className="animate-spin text-primary" size={60} />
          <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse"></div>
        </div>
        <p className="text-text-main/50 font-bold tracking-[0.2em] animate-pulse">
          SEARCHING...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-bg pb-20 pt-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="relative mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1 w-12 bg-primary rounded-full"></span>
                <p className="text-primary font-black uppercase tracking-[0.3em] text-xs">
                  Explore Results
                </p>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-text-main tracking-tighter">
                {query.toUpperCase()}
              </h1>
            </div>
            <div className="bg-surface-elevated/10 backdrop-blur-md border border-white/5 px-6 py-3 rounded-2xl">
              <p className="text-text-main/60 font-bold text-sm">
                FOUND <span className="text-primary">{results.length}</span>{" "}
                TITLES
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
          {results.map((item) => (
            <Link
              key={item.id}
              to={
                item.media_type === "tv"
                  ? `/tv/${item.id}`
                  : `/movie/${item.id}`
              }
              className="group relative flex flex-col gap-4"
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-primary/20">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={item.title || item.name}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl shadow-primary/40">
                    <Play size={24} fill="white" className="text-white ml-1" />
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                  <div className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <Star
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-white text-xs font-black">
                      {item.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Calendar size={12} className="text-primary" />
                  <span className="text-[10px] font-bold text-text-main uppercase tracking-tighter">
                    {(item.release_date || item.first_air_date)?.split(
                      "-",
                    )[0] || "N/A"}
                  </span>
                  <span className="text-text-main/20">•</span>
                  <span className="text-[10px] font-black text-primary uppercase">
                    {item.media_type}
                  </span>
                </div>
                <h3 className="text-text-main font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">
                  {item.title || item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {!loading && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-24 h-24 bg-surface-elevated/20 rounded-full flex items-center justify-center border border-white/5">
              <Film size={40} className="text-white/10" />
            </div>
            <div className="text-center">
              <h3 className="text-text-main/80 font-black text-2xl uppercase tracking-tighter">
                No Matches Found
              </h3>
              <p className="text-text-main/40 text-sm font-medium mt-1">
                Try checking your spelling or use different keywords
              </p>
            </div>
            <Link
              to="/"
              className="px-8 py-3 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
