import { memo } from "react";
import { Link } from "react-router-dom";

function WatchlistCard({ movie, onRemove }) {
  const initial = movie.title?.trim()[0] || "?";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-orange-500/40 transition group">
      <Link
        to={`/movie/${movie.id}`}
        className="relative aspect-[2/3] flex items-end bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden"
      >
        {movie.poster && movie.poster !== "N/A" ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className="absolute top-2 left-2.5 text-6xl font-bold text-white/10">
            {initial}
          </span>
        )}
        <span className="absolute top-0 left-0 bottom-0 w-1 bg-orange-500" />

        <span
          className={`absolute top-2.5 right-2.5 z-10 w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs ${
            movie.watched
              ? "bg-orange-500 text-neutral-950"
              : "bg-black/55 text-white"
          }`}
        >
          {movie.watched ? "✓" : "◎"}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove(movie.id);
          }}
          className="absolute top-2 left-2 z-20 w-6 h-6 rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 hover:bg-red-500 transition flex items-center justify-center"
        >
          ✕
        </button>
      </Link>

      <div className="p-3 flex flex-col gap-2">
        <div className="font-semibold text-sm leading-snug line-clamp-2">
          {movie.title}
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>{movie.year}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(WatchlistCard);
