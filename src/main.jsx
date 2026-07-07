import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./components/Toast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
