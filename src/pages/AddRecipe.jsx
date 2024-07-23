import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import environment from '../utils/enviroment';
import Cookies from 'js-cookie';
import { routes } from "../utils/routes";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await axios.post(`${environment.apiUrl}/recipes/create_or_update.php`, recipe, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && response.data.status === 200) {
        toast.success('Recipe added successfully');
        navigate('/profile');
      } else {
        toast.error('Failed to add recipe');
      }
    } catch (error) {
      toast.error('Error adding recipe');
    }
  };

  return (
    <div className="container mx-auto p-4">
            <Link to={routes.profile} className="flex items-center mb-7 mt-2">
                                <span className="font-semibold text-green-500 text-3xl  hover:text-green-700">Back</span>
                            </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Steps</label>
          <textarea
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
