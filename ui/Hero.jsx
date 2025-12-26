import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero hero-grid">
      <div className="hero-content hero-right">
        <h1>Sizzle & Serve</h1>
        <p>
          Where simple ingredients become unforgettable meals. Watch, learn,
          and cook along — deliciousness starts here.
        </p>
        <Link href="/recipes" className="cta-button">Explore Recipes</Link>
      </div>

      <div className="hero-video-wrapper">
        <video
          className="hero-video"
          src="https://cdn.pixabay.com/video/2020/03/05/33256-396487978_large.mp4"
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          aria-label="Cooking demonstration video"
        />
      </div>
    </section>
  );
}
