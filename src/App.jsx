import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { routes } from "./utils/routes";

const App = () => {
  return (
    <div className="flex-col">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />

          // Redirect all unknown routes to Home
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
