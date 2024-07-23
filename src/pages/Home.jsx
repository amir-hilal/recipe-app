import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { gsap } from 'gsap';
import environment from '../utils/enviroment';
import Recipe from '../components/Recipe';

const Home = () => {
  const saveRecipesToLocalStorage = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  };

  const getRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem('recipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('recipes');
  };

  const [recipes, setRecipes] = useState(getRecipesFromLocalStorage());
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const pageRef = useRef(1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        fetchRecipes();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    clearLocalStorage();
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!loading) {
      animateNewRecipes();
    }
  }, [recipes]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${environment.apiUrl}/recipes/getAll.php`, {
        params: { page: pageRef.current }
      });

      const newRecipes = response.data.data;

      if (!Array.isArray(newRecipes)) {
        console.error('Fetched data is not an array:', newRecipes);
        return;
      }

      const existingRecipes = getRecipesFromLocalStorage();
      const updatedRecipes = mergeRecipes(existingRecipes, newRecipes);

      setRecipes(updatedRecipes);
      saveRecipesToLocalStorage(updatedRecipes);

      pageRef.current += 1;
    } catch (error) {
      console.error('Error fetching recipes', error);
    } finally {
      setLoading(false);
    }
  };

  const mergeRecipes = (existingRecipes, newRecipes) => {
    const mergedRecipes = [...existingRecipes];
    newRecipes.forEach(newRecipe => {
      if (!mergedRecipes.some(recipe => recipe.id === newRecipe.id)) {
        mergedRecipes.push(newRecipe);
      }
    });
    return mergedRecipes;
  };

  const animateNewRecipes = () => {
    gsap.fromTo(
      '.recipe-item',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  };

  return (
    <div className="container mx-auto p-4" ref={containerRef}>
      <h1 className="text-center text-4xl font-semibold text-gray-700 mb-8">Recipes</h1>
      <div className="flex flex-wrap gap-6">
        {Array.isArray(recipes) && recipes.map((recipe, index) => (
          <Recipe key={`recipe-${recipe.id}`} recipe={recipe} className={`recipe-item recipe-item-${index}`} />
        ))}
      </div>
      {loading && <p className="text-center text-lg mt-4">Loading...</p>}
      <ToastContainer />
    </div>
  );
};

export default Home;
