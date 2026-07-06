import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import MovieDetail from "./pages/MovieDetail";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Search />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
