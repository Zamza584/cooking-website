'use client';

import { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { recipes as baseRecipes } from '@/data/recipes';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    function load() {
      try {
        const savedFavorites = localStorage.getItem('favorites');
        const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
        const rawAdded = localStorage.getItem('addedRecipes');
        const added = rawAdded ? JSON.parse(rawAdded) : [];
        const all = [...added, ...baseRecipes];
        const favoriteRecipes = all.filter((r) => favoriteIds.includes(r.id));
        setFavorites(favoriteRecipes);
      } catch (e) {
        setFavorites([]);
      }
    }

    load();
    const handler = () => load();
    window.addEventListener('favoritesUpdated', handler);
    window.addEventListener('recipesUpdated', handler);
    return () => {
      window.removeEventListener('favoritesUpdated', handler);
      window.removeEventListener('recipesUpdated', handler);
    };
  }, []);

  return (
    <div className="favorites-page">
      <h1>My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet. Start adding your favorite recipes!</p>
      ) : (
        <div className="recipes-grid">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
