import { HeroSection } from "@/components/movieComponents/HeroSection";
import { MovieGrid } from "@/components/movieComponents/MovieGrid";
import { useMovies } from "@/hooks/useMovies";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, heroMovie, loading } = useMovies(page);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const gridElement = document.getElementById("now-playing-section");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pb-10">
      {heroMovie && <HeroSection movie={heroMovie} />}

      <div id="now-playing-section" className="container mx-auto px-4 mt-8">
        <header className="flex justify-between items-center mb-8 border-l-4 border-primary pl-4">
          <h2 className="text-3xl font-bold text-text-main uppercase tracking-tight">
            Now Playing
          </h2>
          <span className="text-sm font-medium text-text-main/50 uppercase tracking-widest">
            {movies.length} Releases
          </span>
        </header>

        <MovieGrid
          movies={movies}
          loading={loading}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
