import { X } from "lucide-react";

export default function TrailerModal({ trailerKey, title, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-200 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      {/* 1. Header Area */}
      <div className="w-full max-w-6xl mb-6 flex justify-between items-end animate-in slide-in-from-top-4 duration-500 delay-150">
        <div className="space-y-1">
          <h4 className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-black">
            Cinematic Preview
          </h4>
          <h2 className="text-white text-2xl font-black italic uppercase tracking-tighter">
            {title}{" "}
            <span className="text-white/20 ml-2">// Official Trailer</span>
          </h2>
        </div>

        {/* Close Button with Hover Effect */}
        <button
          onClick={onClose}
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

      {/* 2. Video Container */}
      <div className="relative w-full max-w-6xl aspect-video bg-[#050505] rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 animate-in zoom-in-95 duration-500">
        {/* Decorative Corner Accents (Brutalist Style) */}
        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl-md z-10" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br-md z-10" />

        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0&showinfo=0&color=white`}
          title={`${title} Trailer`}
          className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* 3. Footer Hint */}
      <div className="mt-8 text-white/20 font-mono text-[10px] uppercase tracking-widest animate-pulse">
        Click outside or press ESC to exit theater mode
      </div>
    </div>
  );
}
