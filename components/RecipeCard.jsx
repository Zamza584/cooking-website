import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-media">
        <img src={recipe.image} alt={recipe.name} className="recipe-image" />
        <div className="recipe-card-actions">
          <FavoriteButton recipeId={recipe.id} />
        </div>
      </div>
      <div className="recipe-info">
        <h3>{recipe.name}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-meta">
          <span className="prep-time">Prep: {recipe.prepTime} min</span>
          <span className="cook-time">Cook: {recipe.cookTime} min</span>
        </div>
        <Link href={`/recipe/${recipe.id}`} className="view-recipe-btn">
          View Recipe
        </Link>
      </div>
    </div>
  );
}
