import { useState, useEffect, useCallback } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

const API_KEY = "4e894878";
const VISIBLE_STEP = 4;
const MAX_RESULTS = 10;

function SkeletonCard() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-neutral-800" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-neutral-800 rounded w-4/5" />
        <div className="h-3 bg-neutral-800 rounded w-1/2" />
        <div className="h-8 bg-neutral-800 rounded-lg mt-2" />
      </div>
    </div>
  );
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_STEP);

  const { movies, dispatch, ACTIONS } = useWatchlist();

  // debounce: هر تغییر query، ۵۰۰ میلی‌ثانیه صبر می‌کنه بعد fetch می‌زنه
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
        );
        const data = await res.json();

        if (data.Response === "True") {
          setResults(data.Search.slice(0, MAX_RESULTS));
        } else {
          setResults([]);
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Server Connection Error");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // هر بار جست‌وجوی جدید، شمارنده‌ی نمایش رو ریست کن
  useEffect(() => {
    setVisibleCount(VISIBLE_STEP);
  }, [results]);

  const handleAdd = useCallback(
    (movie) => {
      dispatch({
        type: ACTIONS.MOVIE_ADD,
        payload: {
          id: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
          genre: "",
          watched: false,
          rating: null,
          note: "",
        },
      });
    },
    [dispatch, ACTIONS],
  );

  const isAdded = (imdbID) => movies.some((m) => m.id === imdbID);

  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <section>
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: "Oswald, sans-serif" }}
      >
        Find Your Next Movie 🍿
      </h1>
      <p className="text-neutral-400 text-sm mt-1">
        Please Insert Movie Name . . .
      </p>

      <div className="flex items-center gap-3 bg-white dark:bg-black border border-neutral-800 rounded-2xl px-4 py-3 mt-5">
        <span className="text-neutral-400">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example Interstellar"
          className="flex-1 bg-transparent outline-none text-black dark:text-white font-bold placeholder:text-neutral-500"
        />
      </div>

      {error && !loading && (
        <p className="text-neutral-500 text-center mt-10">{error}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading &&
          visibleResults.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isAdded={isAdded(movie.imdbID)}
              onAdd={handleAdd}
            />
          ))}
      </div>

      {!loading && hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() =>
              setVisibleCount((c) => Math.min(c + VISIBLE_STEP, MAX_RESULTS))
            }
            className="px-6 py-2.5 rounded-xl border border-neutral-700 text-sm font-semibold hover:border-orange-500 hover:text-orange-500 transition"
          >
            View ({results.length - visibleCount} More)
          </button>
        </div>
      )}
    </section>
  );
}
