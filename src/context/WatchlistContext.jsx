import { createContext, useContext, useReducer, useEffect } from "react";
import { watchlistReducer, ACTIONS } from "./watchlistReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [storedMovies, setStoredMovies] = useLocalStorage("watchlist", []);
  const [movies, dispatch] = useReducer(watchlistReducer, storedMovies);

  // هر وقت movies (بعد از هر dispatch) عوض شد، بریزش تو localStorage
  useEffect(() => {
    setStoredMovies(movies);
  }, [movies]);

  const value = { movies, dispatch, ACTIONS };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist باید داخل WatchlistProvider استفاده بشه");
  }
  return context;
}
