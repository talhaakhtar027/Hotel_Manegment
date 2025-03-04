import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboards from "./pages/admin/Dashboards";
import Apps from "./Apps";
import Adminrouter from "./pages/Adminrouter";
import UserProfile from "./pages/fornt_end/data/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /admin by default */}
        <Route path="/" element={<Navigate to="/app" />} />

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<Adminrouter />} />

        {/* App Section */}
        <Route path="/app/*" element={<Apps />} />
        <Route path="/user/*" element={<UserProfile />} />

        {/* Catch-All Route (404 or Redirect) */}
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
