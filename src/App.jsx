import { useState, useEffect, useRef } from 'react';
import birthdayConfig from './birthdayConfig';
import Particles        from './components/Particles';
import Countdown        from './components/Countdown';
import SurpriseReveal   from './components/SurpriseReveal';
import CakeSection      from './components/CakeSection';
import BirthdayMessage  from './components/BirthdayMessage';
import PhotoBooth       from './components/PhotoBooth';
import './index.css';

// Page IDs in order
const PAGES = ['countdown', 'surprise', 'cake', 'message', 'photo'];

// Page labels for the step indicator
const PAGE_LABELS = {
  countdown: '⏳',
  surprise:  '🎉',
  cake:      '🎂',
  message:   '💌',
  photo:     '📸',
};

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme.primary)   root.style.setProperty('--primary',   theme.primary);
  if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
  if (theme.accent)    root.style.setProperty('--accent',    theme.accent);
  if (theme.bgFrom)    root.style.setProperty('--bg-from',   theme.bgFrom);
  if (theme.bgTo)      root.style.setProperty('--bg-to',     theme.bgTo);
  if (theme.cardBg)    root.style.setProperty('--card-bg',   theme.cardBg);
}

export default function App() {
  const cfg = birthdayConfig;
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'back'
  const [animating, setAnimating] = useState(false);
  const prevIndexRef = useRef(0);

  // Effective pages — skip countdown if birthday already passed
  const birthdayPast = new Date(cfg.person.birthdayDate) <= new Date();
  const visiblePages = birthdayPast ? PAGES.slice(1) : PAGES;

  useEffect(() => {
    applyTheme(cfg.theme);
  }, []);

  const goTo = (idx, dir = 'forward') => {
    if (animating || idx < 0 || idx >= visiblePages.length) return;
    setDirection(dir);
    setAnimating(true);
    prevIndexRef.current = pageIndex;
    setTimeout(() => {
      setPageIndex(idx);
      setAnimating(false);
    }, 380);
  };

  const next = () => goTo(pageIndex + 1, 'forward');
  const back = () => goTo(pageIndex - 1, 'back');

  const currentPage = visiblePages[pageIndex];
  const isLast = pageIndex === visiblePages.length - 1;
  const isFirst = pageIndex === 0;

  // Page slide classes
  const slideIn  = direction === 'forward' ? 'page-slide-in-right'  : 'page-slide-in-left';
  const slideOut = direction === 'forward' ? 'page-slide-out-left'  : 'page-slide-out-right';

  return (
    <>
      <Particles />

      {/* ── Top Nav Bar ───────────────────────────────────────── */}
      <header className="top-nav">
        <div className="top-nav-badge">
          <span>🎂</span>
          <span className="top-nav-label">Birthday Celebration</span>
          <span>🎂</span>
        </div>

        {/* Step indicator dots */}
        <div className="step-dots">
          {visiblePages.map((id, i) => (
            <button
              key={id}
              className={`step-dot ${i === pageIndex ? 'active' : i < pageIndex ? 'done' : ''}`}
              onClick={() => goTo(i, i > pageIndex ? 'forward' : 'back')}
              title={id}
              aria-label={`Go to ${id} page`}
            >
              <span className="step-dot-emoji">{PAGE_LABELS[id]}</span>
            </button>
          ))}
        </div>
      </header>

      {/* ── Full-screen page container ─────────────────────────── */}
      <main className="page-stage">
        <div key={currentPage} className={`page-view ${animating ? slideOut : slideIn}`}>

          {currentPage === 'countdown' && (
            <Countdown
              config={cfg}
              onComplete={next}
              onNext={next}
            />
          )}

          {currentPage === 'surprise' && (
            <SurpriseReveal
              config={cfg}
              show
              onReveal={next}
            />
          )}

          {currentPage === 'cake' && (
            <CakeSection
              config={cfg}
              show
              onNext={next}
            />
          )}

          {currentPage === 'message' && (
            <BirthdayMessage
              config={cfg}
              show
              onNext={next}
            />
          )}

          {currentPage === 'photo' && (
            <PhotoBooth
              config={cfg}
              show
              personName={cfg.person.name}
              personAge={cfg.person.age}
            />
          )}
        </div>

        {/* ── Bottom navigation ──────────────────────────────── */}
        <nav className="page-nav">
          <button
            className="btn btn-outline page-nav-btn"
            onClick={back}
            disabled={isFirst}
            style={{ opacity: isFirst ? 0 : 1, pointerEvents: isFirst ? 'none' : 'auto' }}
          >
            ← Back
          </button>

          <span className="page-counter">
            {pageIndex + 1} / {visiblePages.length}
          </span>

          {!isLast && (
            <button className="btn btn-primary page-nav-btn" onClick={next}>
              Next →
            </button>
          )}

          {isLast && (
            <button className="btn btn-gold page-nav-btn" onClick={() => goTo(0, 'back')}>
              🔄 Restart
            </button>
          )}
        </nav>
      </main>
    </>
  );
}
