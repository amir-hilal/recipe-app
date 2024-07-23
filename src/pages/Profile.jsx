import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import environment from '../utils/enviroment';
import { routes } from "../utils/routes";

const Profile = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${environment.apiUrl}/recipes/userRecipes.php`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && response.data.status === 200) {
          setRecipes(response.data.data.recipes);
        } else {
          toast.error('Failed to fetch recipes');
        }
      } catch (error) {
        toast.error('Error fetching recipes');
      }
    };

    fetchRecipes();
  }, []);

  const handleAddRecipe = () => {
    navigate(routes.addRecipe);
  };

  const handleEditRecipe = (id) => {
    navigate(`${routes.editRecipe}/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Recipes</h1>
      <div className="mb-4">
        <button
          onClick={handleAddRecipe}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Add Recipe
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
              <p className="text-gray-600 mt-2">Rating: {recipe.rating}</p>
            </div>
            <div className='flex justify-end'>
              <button onClick={() => handleEditRecipe(recipe.id)} className='py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
