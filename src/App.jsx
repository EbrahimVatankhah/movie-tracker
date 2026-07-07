import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import MovieDetail from "./pages/MovieDetail";
import Settings from "./pages/Settings";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Search />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
