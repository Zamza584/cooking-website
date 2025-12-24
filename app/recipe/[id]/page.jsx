"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { recipes as baseRecipes } from "@/data/recipes";
import FavoriteButton from "@/components/FavoriteButton";
import Toast from "@/components/Toast";

export default function RecipeDetail({ params }) {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("addedRecipes");
      const added = raw ? JSON.parse(raw) : [];
      const all = [...added, ...baseRecipes];
      const found = all.find((r) => r.id === parseInt(params.id));
      setRecipe(found || null);
      setIsAdded(added.some((r) => r.id === parseInt(params.id)));
    } catch (e) {
      setRecipe(null);
    }
  }, [params.id]);

  function handleDelete() {
    if (!isAdded) {
      setToastMessage("Cannot delete built-in recipes");
      setToastVisible(true);
      return;
    }
    try {
      const raw = localStorage.getItem("addedRecipes");
      const added = raw ? JSON.parse(raw) : [];
      const filtered = added.filter((r) => r.id !== parseInt(params.id));
      localStorage.setItem("addedRecipes", JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent("recipesUpdated", { detail: filtered }));
      setToastMessage("Recipe deleted successfully");
      setToastVisible(true);
      setTimeout(() => router.push("/recipes"), 1500);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to delete recipe");
      setToastVisible(true);
    }
  }

  if (!recipe) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Recipe not found</div>;
  }

  return (
    <div className="recipe-detail">
      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "space-between", flexWrap: "wrap" }}>
        <h1 style={{ marginRight: "auto" }}>{recipe.name}</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <FavoriteButton recipeId={recipe.id} />
          {isAdded && (
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          )}
        </div>
      </div>

      <img src={recipe.image} alt={recipe.name} />
      <p className="description">{recipe.description}</p>

      <section>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>

      <p className="prep-time">Prep Time: {recipe.prepTime} minutes</p>
      <p className="cook-time">Cook Time: {recipe.cookTime} minutes</p>
    </div>
  );
}
