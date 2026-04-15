import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function MovieRecommendations({ recommendations }) {
  return (
    <div className="py-16 px-12 border-t border-white/5 relative">
      <header className="flex justify-between items-center mb-8 border-l-4 border-primary pl-4">
        <h2 className="text-3xl font-bold uppercase tracking-tight">
          Recommendation
        </h2>
        <span className="text-sm opacity-50 uppercase tracking-widest">
          Releases
        </span>
      </header>
      <h3 className="text-9xl font-black opacity-5 mb-12 absolute top-0 -translate-y-1/2 select-none">
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
  );
}
