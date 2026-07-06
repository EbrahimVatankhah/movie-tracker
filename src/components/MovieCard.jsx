import { memo } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, isAdded, onAdd }) {
  const initial = movie.Title?.trim()[0] || "?";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-orange-500/40 transition">
      <Link
        to={`/movie/${movie.imdbID}`}
        className="relative aspect-[2/3] flex items-end bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden"
      >
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className="absolute top-2 left-2.5 text-6xl font-bold text-white/10">
            {initial}
          </span>
        )}
        <span className="absolute top-0 left-0 bottom-0 w-1 bg-orange-500" />
        <span className="relative z-10 m-2.5 text-[10px] px-2 py-1 rounded-md bg-black/55 text-white font-mono">
          {movie.Year} · {movie.Type}
        </span>
      </Link>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="font-semibold text-sm leading-snug line-clamp-2">
          {movie.Title}
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>{movie.Year}</span>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onAdd(movie)}
            disabled={isAdded}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
              isAdded
                ? "bg-orange-500/15 text-orange-500 cursor-default"
                : "bg-orange-500 text-neutral-950 hover:brightness-110"
            }`}
          >
            {isAdded ? "✓ Added" : "+ Add to watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(MovieCard);
