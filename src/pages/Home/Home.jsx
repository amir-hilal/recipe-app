import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mt-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Recipe App</h1>
        <p className="text-xl text-gray-600 mt-4">Discover the best recipes, create your own, and share with friends!</p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="https://via.placeholder.com/400x200" alt="Recipe Category" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Breakfast</div>
            <p className="text-gray-700 text-base">
              Start your day with energy with these fabulous breakfast recipes.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="https://via.placeholder.com/400x200" alt="Recipe Category" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Lunch</div>
            <p className="text-gray-700 text-base">
              Explore our lunch options to keep your afternoon vibrant and delicious.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="https://via.placeholder.com/400x200" alt="Recipe Category" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Dinner</div>
            <p className="text-gray-700 text-base">
              End your day on a high note with a wonderful dinner recipe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
