import { MovieCard } from "./MovieCard";
import MoviePagination from "./MoviePagination";
import { SkeletonCard } from "./SkeletonCard";

export const MovieGrid = ({
  movies,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (loading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </>
    );
  }

  if (!movies.length) {
    return (
      <div className="text-center py-20">
        <p className="text-text-main/60 text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {totalPages > 1 && (
        <MoviePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
