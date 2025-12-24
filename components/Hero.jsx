export default function Hero() {
  return (
    <section className="hero hero-grid">
      <div className="hero-content hero-right">
        <h1>Sizzle & Serve</h1>
        <p>
          Where simple ingredients become unforgettable meals. Watch, learn,
          and cook along — deliciousness starts here.
        </p>
        <button className="cta-button">Explore Recipes</button>
      </div>

      <div className="hero-video-wrapper">
        <div className="video-overlay-text">Sizzle & Serve — Watch the magic</div>
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
