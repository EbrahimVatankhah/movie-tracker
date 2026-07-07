import { useState, useMemo, useCallback } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import WatchlistCard from "../components/WatchlistCard";

const VISIBLE_STEP = 4;
const MAX_VISIBLE = 10;

export default function Dashboard() {
  const { movies, dispatch, ACTIONS } = useWatchlist();

  const [statusFilter, setStatusFilter] = useState("all"); // all | watched | unwatched
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("added"); // added | rating | year | az
  const [visibleCount, setVisibleCount] = useState(VISIBLE_STEP);

  const genres = useMemo(() => {
    const set = new Set(movies.map((m) => m.genre).filter(Boolean));
    return ["all", ...set];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let list = [...movies];

    if (statusFilter === "watched") list = list.filter((m) => m.watched);
    if (statusFilter === "unwatched") list = list.filter((m) => !m.watched);
    if (genreFilter !== "all")
      list = list.filter((m) => m.genre === genreFilter);

    if (sortBy === "rating")
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortBy === "year") list.sort((a, b) => (b.year || 0) - (a.year || 0));
    if (sortBy === "az") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [movies, statusFilter, genreFilter, sortBy]);

  const handleRemove = useCallback(
    (id) => {
      dispatch({ type: ACTIONS.MOVIE_REMOVE, payload: { id } });
    },
    [dispatch, ACTIONS],
  );

  const visibleMovies = filteredMovies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMovies.length;

  const chipClass = (active) =>
    `px-3.5 py-2 rounded-full text-xs font-semibold border transition ${
      active
        ? "bg-orange-500 text-neutral-950 border-orange-500"
        : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"
    }`;

  return (
    <section>
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: "Oswald, sans-serif" }}
      >
        Watchlist
      </h1>
      <p className="text-neutral-400 text-sm mt-1">All your Movies are here</p>

      {movies.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <button
              className={chipClass(statusFilter === "all")}
              onClick={() => {
                setStatusFilter("all");
                setVisibleCount(VISIBLE_STEP);
              }}
            >
              All
            </button>
            <button
              className={chipClass(statusFilter === "watched")}
              onClick={() => {
                setStatusFilter("watched");
                setVisibleCount(VISIBLE_STEP);
              }}
            >
              Watched
            </button>
            <button
              className={chipClass(statusFilter === "unwatched")}
              onClick={() => {
                setStatusFilter("unwatched");
                setVisibleCount(VISIBLE_STEP);
              }}
            >
              Unwatched
            </button>

            <select
              value={genreFilter}
              onChange={(e) => {
                setGenreFilter(e.target.value);
                setVisibleCount(VISIBLE_STEP);
              }}
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-300 outline-none"
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g === "all" ? "Genre: All" : g}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-300 outline-none"
            >
              <option value="added">Sort: Date added</option>
              <option value="rating">By rating</option>
              <option value="year">By year</option>
              <option value="az">A–Z</option>
            </select>

            <span className="font-mono text-xs bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full text-neutral-400">
              <b className="text-orange-500">{filteredMovies.length}</b> movies
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {visibleMovies.map((movie) => (
              <WatchlistCard
                key={movie.id}
                movie={movie}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() =>
                  setVisibleCount((c) =>
                    Math.min(c + VISIBLE_STEP, MAX_VISIBLE),
                  )
                }
                className="px-6 py-2.5 rounded-xl border border-neutral-700 text-sm font-semibold hover:border-orange-500 hover:text-orange-500 transition"
              >
                View ({filteredMovies.length - visibleCount} Movie)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 border border-dashed border-neutral-800 rounded-2xl mt-5">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-orange-500/15 text-orange-500 flex items-center justify-center text-2xl">
        🎬
      </div>
      <h3 className="font-semibold text-lg mb-1">Empty Watchlist</h3>
      <p className="text-neutral-400 text-sm mb-5">
        Add Your First Movie from Serach Page
      </p>
    </div>
  );
}
