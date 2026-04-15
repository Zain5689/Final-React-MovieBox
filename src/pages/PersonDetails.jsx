import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, Film } from "lucide-react";
import { usePersonDetails } from "@/hooks/usePersonDetails";

export default function PersonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { person, credits, loading } = usePersonDetails(id);

  if (loading || !person) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-primary text-5xl animate-pulse font-black italic">
          LOADING_TALENT...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-primary overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] select-none z-0">
        <h1 className="text-[30vw] font-black leading-none uppercase -rotate-12 translate-y-1/3">
          {person.name?.split(" ")[0]}
        </h1>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        <div className="lg:col-span-4 border-r border-white/5 p-8 lg:p-12 flex flex-col bg-[#080808]/50 backdrop-blur-sm">
          <button
            onClick={() => navigate(-1)}
            className="mb-12 p-4 w-fit hover:bg-primary rounded-full transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="relative group mb-10">
            <div className="absolute -inset-4 border border-white/5 rounded-3xl transition-all group-hover:inset-0" />
            <img
              src={`https://image.tmdb.org/t/p/h632${person.profile_path}`}
              className="w-full grayscale hover:grayscale-0 rounded-2xl shadow-2xl transition-all duration-700 relative z-10"
              alt={person.name}
            />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="space-y-1">
              <span className="text-primary font-mono text-[10px] uppercase tracking-widest font-bold">
                Born
              </span>
              <p className="text-lg font-bold">{person.birthday || "N/A"}</p>
              <p className="text-sm text-white/40">{person.place_of_birth}</p>
            </div>

            <div className="space-y-1">
              <span className="text-primary font-mono text-[10px] uppercase tracking-widest font-bold">
                Department
              </span>
              <p className="text-lg font-bold uppercase italic tracking-tighter">
                {person.known_for_department}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 p-8 lg:p-20">
          <header className="mb-16">
            <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] mb-8">
              {person.name}
            </h1>
            <div className="max-w-2xl">
              <p className="text-white/60 leading-relaxed text-lg font-light italic border-l-2 border-primary pl-6">
                {person.biography || "No biography available."}
              </p>
            </div>
          </header>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <Film className="text-primary" size={20} />
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                Filmography
              </h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credits
                ?.sort((a, b) => b.popularity - a.popularity)
                .slice(0, 12)
                .map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-primary/40 transition-all hover:translate-x-2"
                  >
                    <div className="w-16 h-24 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold uppercase tracking-tight group-hover:text-primary transition-colors text-sm md:text-base">
                        {movie.title}
                      </h4>
                      <p className="text-[10px] text-white/40 uppercase font-mono mt-1">
                        {movie.character ? `As ${movie.character}` : "Cast"} //{" "}
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "TBA"}
                      </p>
                    </div>
                    <Star
                      size={14}
                      className="text-primary opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
