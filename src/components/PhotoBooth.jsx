import { useState } from 'react';

export default function PhotoBooth({ config, show, personName, personAge }) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const slides = config.photoBooth.slides;
  const total = slides.length;

  const navigate = (dir) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setIndex((i) => (i + dir + total) % total);
      setFading(false);
    }, 280);
  };

  if (!show) return null;

  return (
    <div className="full-page-section">
      <div className="section-inner" style={{ maxWidth: 780, gap: '1rem' }}>
        <p className="title-script" style={{ marginBottom: '0.25rem' }}>
          📸 Memory Photo Booth
        </p>
        <p className="subtitle" style={{ marginBottom: '1rem' }}>
          Swipe through beautiful moments 🌸
        </p>

        {/* Slide */}
        <div
          className="photo-slide"
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.28s ease', width: '100%' }}
        >
          <img
            src={import.meta.env.BASE_URL + slides[index].imageUrl}
            alt={`Memory ${index + 1}`}
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://placehold.co/800x600/1a0533/FF6B9D?text=Memory+${index + 1}`;
            }}
          />
          <div className="photo-quote-overlay">
            &ldquo;{slides[index].quote}&rdquo;
          </div>
        </div>

        {/* Navigation */}
        <div className="photo-nav">
          <button className="photo-nav-btn" onClick={() => navigate(-1)} aria-label="Previous">◀</button>

          <div className="photo-dots">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`photo-dot ${i === index ? 'active' : ''}`}
                onClick={() => {
                  if (!fading) {
                    setFading(true);
                    setTimeout(() => { setIndex(i); setFading(false); }, 280);
                  }
                }}
              />
            ))}
          </div>

          <button className="photo-nav-btn" onClick={() => navigate(1)} aria-label="Next">▶</button>
        </div>

        {/* Counter */}
        <p className="subtitle" style={{ fontSize: '0.85rem' }}>
          Photo {index + 1} of {total}
        </p>

        {/* Final footer message */}
        <div className="divider" style={{ maxWidth: 300 }} />
        <p className="title-script" style={{ fontSize: '1.3rem', color: 'var(--accent)' }}>
          Made with 💖 for {personName || 'You'}
        </p>
        <p className="subtitle" style={{ fontSize: '0.8rem' }}>
          🎂 Happy {personAge || ''}th Birthday! 🎂
        </p>
      </div>
    </div>
  );
}
