import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { useDebouncedSave } from "../hooks/useDebouncedSave";
import { useToast } from "../components/Toast";
import RatingStars from "../components/RatingStars";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, dispatch, ACTIONS } = useWatchlist();
  const { showToast } = useToast();

  const savedMovie = movies.find((m) => m.id === id);

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(savedMovie?.note || "");

  const textareaRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") setDetails(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (savedMovie) textareaRef.current?.focus();
  }, [savedMovie]);

  const saved = useDebouncedSave(note, (value) => {
    if (savedMovie)
      dispatch({ type: ACTIONS.NOTE_SET, payload: { id, note: value } });
  });

  if (loading) {
    return (
      <div className="space-y-3 mt-6">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse w-1/3" />
        <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!details) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">
          There is No Data for this Movie
        </p>
        <Link to="/dashboard" className="text-orange-500 font-semibold">
          Back to Dahboard
        </Link>
      </div>
    );
  }

  const handleAddToWatchlist = () => {
    dispatch({
      type: ACTIONS.MOVIE_ADD,
      payload: {
        id: details.imdbID,
        title: details.Title,
        poster: details.Poster,
        year: details.Year,
        genre: details.Genre?.split(",")[0]?.trim() || "",
        watched: false,
        rating: null,
        note: "",
      },
    });
    showToast(`«${details.Title}» Added to WatchList`);
  };

  const toggleWatched = () => {
    dispatch({ type: ACTIONS.WATCHED_TOGGLE, payload: { id } });
  };

  const handleRemove = () => {
    dispatch({ type: ACTIONS.MOVIE_REMOVE, payload: { id } });
    showToast("Movie Deleted from Dashboard", "danger");
    navigate("/dashboard");
  };

  const handleRate = (v) => {
    dispatch({ type: ACTIONS.RATING_SET, payload: { id, rating: v } });
  };

  const initial = details.Title?.trim()[0] || "?";
  const backTo = savedMovie ? "/dashboard" : "/";
  const backLabel = savedMovie ? "← Back to Dashboard" : "← Back to Search";

  return (
    <section>
      <Link
        to={backTo}
        className="inline-flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-sm font-semibold hover:text-orange-500 transition mt-1"
      >
        {backLabel}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 mt-5">
        <div className="relative aspect-[2/3] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center overflow-hidden">
          {details.Poster && details.Poster !== "N/A" ? (
            <img
              src={details.Poster}
              alt={details.Title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span className="text-8xl font-bold text-neutral-900/10 dark:text-white/10">
              {initial}
            </span>
          )}
          <span className="absolute top-0 left-0 bottom-0 w-1.5 bg-orange-500" />
        </div>

        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            {details.Title}
          </h1>

          <div className="flex flex-wrap gap-2.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-4">
            <span className="px-2.5 py-1 border border-neutral-200 dark:border-neutral-800 rounded-lg">
              {details.Year}
            </span>
            {details.Runtime !== "N/A" && (
              <span className="px-2.5 py-1 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                {details.Runtime}
              </span>
            )}
            {details.Genre && (
              <span className="px-2.5 py-1 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                {details.Genre}
              </span>
            )}
            {details.imdbRating !== "N/A" && (
              <span className="px-2.5 py-1 border border-orange-500/40 rounded-lg text-orange-500">
                ★ {details.imdbRating} IMDb
              </span>
            )}
          </div>

          {details.Plot && (
            <p className="text-sm leading-8 text-neutral-700 dark:text-neutral-200 mb-5">
              {details.Plot}
            </p>
          )}

          {!savedMovie && (
            <button
              onClick={handleAddToWatchlist}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 text-neutral-950 hover:brightness-110 transition"
            >
              + Add to Watchlist
            </button>
          )}

          {savedMovie && (
            <>
              <div className="flex flex-wrap gap-2.5 mb-6">
                <button
                  onClick={toggleWatched}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    savedMovie.watched
                      ? "bg-orange-500 text-neutral-950"
                      : "border border-neutral-300 dark:border-neutral-700 hover:border-orange-500 hover:text-orange-500"
                  }`}
                >
                  {savedMovie.watched ? "✓ Watched" : "◎ Mark as watched"}
                </button>
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-neutral-500 dark:text-neutral-400 hover:text-red-500 transition"
                >
                  Delete from WatchList
                </button>
              </div>

              <div className="mb-6">
                <span className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                  Score
                </span>
                <RatingStars rating={savedMovie.rating} onRate={handleRate} />
              </div>

              <div>
                <span className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                  Notes
                </span>
                <textarea
                  ref={textareaRef}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your idea and notes about this movie . . ."
                  className="w-full min-h-[110px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 text-sm leading-7 outline-none focus:border-orange-500 resize-y"
                />
                <div
                  className={`text-xs text-orange-500 h-4 mt-1.5 transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}
                >
                  Saved
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
