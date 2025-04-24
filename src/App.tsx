import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./page/Dashboard";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
