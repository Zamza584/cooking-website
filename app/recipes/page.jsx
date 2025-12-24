import RecipesList from '@/components/RecipesList';

export default function RecipesPage() {
  return (
    <div className="recipes-page">
      <h1>All Recipes</h1>
      <RecipesList featured={false} />
    </div>
  );
}
