import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./page/Dashboard";
import Header from "./components/Header";
import MusicList from "./page/MusicList";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/MusicList" element={<MusicList />} />
      </Routes>
    </Router>
  );
};

export default App;
