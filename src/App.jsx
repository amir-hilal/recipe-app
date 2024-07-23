// src/App.js
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { PrivateRoute } from "./components/RouteGuards"; // Ensure these are correctly defined
import { AuthProvider } from "./context/AuthContext";
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RecipeDetail from './pages/RecipeDetail';
import Register from "./pages/Register";
import { routes } from "./utils/routes";

const App = () => {
  return (
    <div className="flex-col">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route
              path={routes.profile}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path={routes.login}
              element={
                  <Login />
              }
            />
            <Route
              path={routes.register}
              element={
                  <Register />
              }
            />
             <Route path={routes.addRecipe} element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
             <Route path="recipe/:id" element={<RecipeDetail />} />
             <Route path="edit-recipe/:id" element={<PrivateRoute><EditRecipe /></PrivateRoute>} />
            <Route path="*" element={<Navigate to={routes.home} replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
