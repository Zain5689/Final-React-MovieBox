import { usePeople } from "@/hooks/usePeople";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Star } from "lucide-react";

export default function People() {
  const { people, loading } = usePeople();

  if (loading)
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono text-primary text-5xl animate-pulse">
        LOADING...
      </div>
    );

  return (
    <div className="min-h-screen  text-white selection:bg-primary overflow-x-hidden">
      {/* Background Typography */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] select-none z-0">
        <h1 className="text-[35vw] font-black leading-none uppercase -rotate-12 translate-y-1/4">
          CAST
        </h1>
      </div>

      {/* Header */}
      <header className="relative z-10 p-8 lg:p-12 flex justify-between items-end border-b border-white/5">
        <div className="space-y-2">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.5em]">
            Industry Talents
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none">
            People
          </h1>
        </div>
        <div className="hidden md:block text-right opacity-30 font-mono text-xs">
          TOTAL_RECORDS // {people.length} <br />
          SORT_BY // POPULARITY
        </div>
      </header>

      {/* People Grid */}
      <main className="relative z-10 p-8 lg:p-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </main>
    </div>
  );
}

function PersonCard({ person }) {
  return (
    <Link to={`/people/${person.id}`} className="group relative">
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-white/5 group-hover:border-primary/50 transition-all duration-500">
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            alt={person.name}
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <User size={48} className="text-white/10" />
          </div>
        )}

        {/* Floating Rank/Popularity */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary">
            <Star size={10} fill="currentColor" />
            {person.popularity.toFixed(0)}
          </div>
        </div>

        {/* Overlay Info */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
          <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1">
            {person.known_for_department}
          </p>
          <h3 className="text-xl font-black italic uppercase leading-tight">
            {person.name}
          </h3>
        </div>
      </div>

      {/* Bottom Info (Always visible or semi-visible) */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
          {person.name}
        </h3>
        <p className="text-[10px] text-white/40 uppercase font-mono">
          {person.known_for?.[0]?.title || person.known_for?.[0]?.name || "N/A"}
        </p>
      </div>
    </Link>
  );
}
