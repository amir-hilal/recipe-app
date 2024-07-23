import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import environment from '../utils/enviroment';
import jsPDF from 'jspdf';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();
  const contentRef = useRef();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${environment.apiUrl}/recipes/getOne.php`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { id }
        });
        if (response.data && response.data.status === 200) {
          setRecipe(response.data.data.recipe);
          setIsOwner(response.data.data.recipe.user_id === response.data.user_id);
        } else {
          toast.error('Failed to fetch recipe');
        }
      } catch (error) {
        toast.error('Error fetching recipe');
      }
    };

    fetchRecipe();
  }, [id]);

  const handleEditRecipe = () => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success('URL copied to clipboard');
    }, (err) => {
      toast.error('Failed to copy URL');
    });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(recipe.title, 10, 10);
    doc.setFontSize(12);
    doc.text(`Author: ${recipe.author}`, 10, 20);
    doc.text(`Rating: ${recipe.rating}`, 10, 30);
    doc.text('Description:', 10, 40);
    doc.text(recipe.description, 10, 50);
    doc.text('Ingredients:', 10, 70);
    doc.text(recipe.ingredients.split('\n').join(', '), 10, 80);
    doc.text('Steps:', 10, 100);
    doc.text(recipe.steps.split('\n').join(', '), 10, 110);
    doc.save(`${recipe.title}.pdf`);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div ref={contentRef}>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
        <p className="text-gray-600 mt-2">{recipe.description}</p>
        <p className="text-gray-600 mt-2 font-bold">Author: {recipe.author}</p>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500 mr-1" />
          <p className="text-gray-800">{recipe.rating}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Ingredients</h3>
          <ul className="mt-2 space-y-2">
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <li key={index} className="text-gray-600 bg-gray-100 p-2 rounded-md">{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mt-4">Steps</h3>
          <ul className="mt-2 space-y-2">
            {recipe.steps.split('\n').map((step, index) => (
              <li key={index} className="text-gray-600 bg-gray-100 p-2 rounded-md">{step}</li>
            ))}
          </ul>
        </div>
      </div>
      {isOwner && (
        <button
          onClick={handleEditRecipe}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Edit Recipe
        </button>
      )}
      <button
        onClick={handleCopyUrl}
        className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 ml-2"
      >
        Share URL
      </button>
      <button
        onClick={handleDownload}
        className="mt-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ml-2"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default RecipeDetail;
