import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import PageTransition from "./PageTransition";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition ${
      isActive
        ? "bg-orange-500 text-neutral-950"
        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
    }`;

  return (
    <div className="max-w-6xl mx-auto min-h-screen flex flex-col pb-20 md:pb-0 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur bg-white/90 dark:bg-neutral-950/90">
        <div className="flex items-center gap-2 font-bold tracking-wide uppercase">
          <span className="w-6 h-6 rounded-md bg-orange-500 text-neutral-950 flex items-center justify-center text-sm font-extrabold">
            MT
          </span>
          Movie<span className="text-orange-500">Tracker</span>
        </div>

        <nav className="hidden md:flex gap-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-1">
          <NavLink to="/" end className={linkClass}>
            Search
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </nav>

        <button
          onClick={toggleTheme}
          className="w-13 h-7.5 flex items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full p-1 transition"
          aria-label="Toggle theme"
        >
          <span
            className={`w-5.5 h-5.5 rounded-full bg-orange-500 flex items-center justify-center text-xs transition-transform ${
              theme === "light" ? "translate-x-5.5" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
        </button>
      </header>

      <main className="flex-1 px-5 py-6">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <nav className="fixed bottom-0 inset-x-0 md:hidden flex bg-white/90 dark:bg-neutral-950/90 border-t border-neutral-200 dark:border-neutral-800 backdrop-blur px-2 py-2">
        <NavLink
          to="/"
          end
          className="flex-1 flex flex-col items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"
        >
          <span className="text-lg">🔍</span>Search
        </NavLink>
        <NavLink
          to="/dashboard"
          className="flex-1 flex flex-col items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"
        >
          <span className="text-lg">🎞</span>Dashboard
        </NavLink>
        <NavLink
          to="/settings"
          className="flex-1 flex flex-col items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"
        >
          <span className="text-lg">⚙</span>Settings
        </NavLink>
      </nav>
    </div>
  );
}
