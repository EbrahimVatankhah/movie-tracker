import { useTheme } from "../context/ThemeContext";
import { useWatchlist } from "../context/WatchlistContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { dispatch, ACTIONS, movies } = useWatchlist();

  const handleClear = () => {
    if (confirm("Are you sure about deleting All datas ??!")) {
      movies.forEach((m) =>
        dispatch({ type: ACTIONS.MOVIE_REMOVE, payload: { id: m.id } }),
      );
    }
  };

  return (
    <section>
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: "Oswald, sans-serif" }}
      >
        Settings
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
        Manage Your Theme and Datas
      </p>

      <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 mt-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm">Theme</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Switch between Dark and Light Theme
            </div>
          </div>
          <div className="flex bg-neutral-200 dark:bg-neutral-800 rounded-lg p-1 gap-1">
            <button
              onClick={() => theme !== "dark" && toggleTheme()}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold ${theme === "dark" ? "bg-orange-500 text-neutral-950" : "text-neutral-500"}`}
            >
              🌙 Dark
            </button>
            <button
              onClick={() => theme !== "light" && toggleTheme()}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold ${theme === "light" ? "bg-orange-500 text-neutral-950" : "text-neutral-500"}`}
            >
              ☀ Light
            </button>
          </div>
        </div>
      </div>

      <div className="border border-red-500/30 bg-red-500/5 rounded-2xl p-5 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm text-red-500">
              Delete All Datas
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              All Movies , Scores and Notes are gonna delete
            </div>
          </div>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:brightness-110"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
