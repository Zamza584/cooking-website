import Hero from '@/ui/Hero';
import RecipesList from '@/ui/recipes/RecipesList';

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="recipes-section">
        <h2>Featured Recipes</h2>
        <RecipesList featured={true} limit={6} />
      </section>
    </div>
  );
}
