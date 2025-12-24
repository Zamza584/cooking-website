"use client";

import { useEffect, useState } from "react";
import { recipes as baseRecipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function RecipesList({ featured = false, limit = 6 }) {
    const [recipes, setRecipes] = useState(baseRecipes);

    useEffect(() => {
        function load() {
            try {
                const raw = localStorage.getItem("addedRecipes");
                const added = raw ? JSON.parse(raw) : [];
                const merged = [...added, ...baseRecipes];
                setRecipes(merged);
            } catch (e) {
                setRecipes(baseRecipes);
            }
        }
        load();
        const onUpdate = () => load();
        window.addEventListener("recipesUpdated", onUpdate);
        return () => window.removeEventListener("recipesUpdated", onUpdate);
    }, []);

    const list = featured ? recipes.slice(0, limit) : recipes;

    return (
        <div className="recipes-grid">
            {list.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
            ))}
        </div>
    );
}
