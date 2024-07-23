import axios from 'axios';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import environment from '../utils/enviroment';
import Cookies from 'js-cookie';
import { routes } from "../utils/routes";

const Recipe = ({ recipe }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const handleShowMore = () => {
    setShowAllComments(!showAllComments);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    try {
      const token = Cookies.get('token')
      const response = await axios.post(`${environment.apiUrl}/comments/add.php`, {
        recipe_id: recipe.id,
        comment: newComment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.status === 200) {
        toast.success('Comment added successfully');
        recipe.comments.push(newComment);
        setNewComment('');
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      toast.error('Error adding comment');
    }
  };

  const handleSeeDetails = (id) => {
    navigate(`${routes.recipe}/${id}`);
  };


  return (
    <div className="recipe-item w-full bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{recipe.title}</h2>
          <p className="text-gray-600 mt-2">{recipe.description}</p>
          <p className="text-gray-600 mt-2 font-bold">{recipe.author}</p>
        </div>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500 mr-1" />
          <p className="text-gray-800">{recipe.rating}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
          <ul className="mt-2 space-y-2">
            {(Array.isArray(recipe.comments) ? (showAllComments ? recipe.comments : recipe.comments.slice(0, 2)) : []).map((comment, index) => (
              <li key={index} className="text-gray-600 bg-gray-100 p-2 rounded-md">{comment}</li>
            ))}
          </ul>
          {Array.isArray(recipe.comments) && recipe.comments.length > 2 && (
            <button
              onClick={handleShowMore}
              className="text-blue-500 mt-2"
            >
              {showAllComments ? 'Show Less' : 'Show More'}
            </button>
          )}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-10/12 px-3 py-2 items-center  border-gray-300 rounded-md drop-shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={handleAddComment}
              className="w-2/12 flex justify-center ml-3 h-full py-2 items-center  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Send
            </button>
          </div>
        </div>
        <button
          onClick={() => { handleSeeDetails(recipe.id) }}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default Recipe;
