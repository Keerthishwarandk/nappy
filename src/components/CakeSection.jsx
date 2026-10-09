import { useState, useEffect, useCallback, useRef } from 'react';

/* ── Confetti burst ─────────────────────────────────────────── */
function spawnConfetti(x, y) {
  const colours = ['#FF6B9D', '#FFD700', '#FF8C42', '#C44569', '#fff', '#9B59B6', '#3498DB'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const color = colours[Math.floor(Math.random() * colours.length)];
    el.style.cssText = `
      left:${x}px; top:${y}px;
      background:${color};
      width:${Math.random() * 12 + 4}px;
      height:${Math.random() * 12 + 4}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '3px'};
      transform:rotate(${Math.random() * 360}deg);
      position:fixed; z-index:9998; pointer-events:none;
    `;
    document.body.appendChild(el);

    const angle = (Math.random() * 2 * Math.PI);
    const speed = Math.random() * 500 + 200;
    const vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed - 350;
    let px = x, py = y;
    let start = null;

    const animate = (ts) => {
      if (!start) start = ts;
      const dt = (ts - start) / 1000;
      vy += 900 * 0.016;
      px += vx * 0.016;
      py += vy * 0.016;
      el.style.left = px + 'px';
      el.style.top = py + 'px';
      el.style.opacity = String(Math.max(0, 1 - dt * 0.5));
      if (dt < 2.5 && py < window.innerHeight + 60) requestAnimationFrame(animate);
      else el.remove();
    };
    requestAnimationFrame(animate);
  }
}

/* ── Robust audio player ────────────────────────────────────── */
function playBirthdayAudio(url) {
  if (!url) return;

  // Attempt 1: direct Audio element (works when user has interacted)
  const tryPlay = (src, crossOrigin) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      if (crossOrigin) audio.crossOrigin = 'anonymous';
      audio.volume = 0.85;
      audio.src = src;
      audio.oncanplaythrough = () => {
        audio.play().then(resolve).catch(reject);
      };
      audio.onerror = reject;
      // Timeout fallback
      setTimeout(() => reject(new Error('timeout')), 5000);
    });
  };

  tryPlay(url, true)
    .catch(() => tryPlay(url, false))         // retry without CORS header
    .catch(() => {
      // Attempt 2: Web Audio API synthetic "party" beep
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const playBeep = (freq, startTime, dur) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.4, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
          osc.start(startTime);
          osc.stop(startTime + dur);
        };
        // Party horn arpeggio
        const t = ctx.currentTime;
        [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => {
          playBeep(f, t + i * 0.12, 0.25);
        });
      } catch (_) { }
    });
}

/* ── SVG Birthday Cake ──────────────────────────────────────── */
function BirthdayCake({ sliced, numCandles }) {
  const candles = Math.min(numCandles, 10);
  const candleSpacing = 300 / (candles + 1);

  return (
    <svg viewBox="0 0 400 420" width="100%" height="100%" style={{ display: 'block', maxWidth: 360, margin: '0 auto' }}>
      {/* Plate shadow */}
      <ellipse cx="200" cy="385" rx="190" ry="20" fill="#2d0a4e" opacity="0.5" />

      {/* Bottom tier */}
      <rect x="30" y="265" width="340" height="118" rx="20" fill="#C44569" />
      <rect x="30" y="265" width="340" height="32" rx="0" fill="#FF6B9D" opacity="0.45" />
      {[55, 95, 140, 185, 230, 278, 325, 365].map((x, i) => (
        <ellipse key={i} cx={x} cy={265} rx={13} ry={17} fill="white" opacity="0.88" />
      ))}

      {/* Top tier */}
      <rect x="72" y="162" width="256" height="108" rx="18" fill="#FF6B9D" />
      <rect x="72" y="162" width="256" height="26" rx="0" fill="#FF8CBD" opacity="0.5" />
      {[90, 128, 166, 204, 242, 278, 318].map((x, i) => (
        <ellipse key={i} cx={x} cy={162} rx={11} ry={14} fill="white" opacity="0.92" />
      ))}

      {/* Gold dots decoration */}
      {[65, 105, 148, 190, 232, 274, 316, 355].map((x, i) => (
        <circle key={i} cx={x} cy={318} r={5.5} fill="#FFD700" opacity="0.85" />
      ))}
      {[88, 132, 176, 220, 264, 310].map((x, i) => (
        <circle key={i} cx={x} cy={205} r={4.5} fill="#FFD700" opacity="0.85" />
      ))}

      {/* Slice mark when cut */}
      {sliced && (
        <g>
          <polygon
            points="200,95 162,265 238,265"
            fill="rgba(255,220,50,0.55)"
            stroke="#FFD700"
            strokeWidth="2.5"
            style={{ filter: 'drop-shadow(0 0 10px #FFD700)' }}
          />
          <line x1="200" y1="95" x2="162" y2="265" stroke="#FFD700" strokeWidth="3" strokeDasharray="6 3" />
          <line x1="200" y1="95" x2="238" y2="265" stroke="#FFD700" strokeWidth="3" strokeDasharray="6 3" />
        </g>
      )}

      {/* Candles */}
      {Array.from({ length: candles }).map((_, i) => {
        const cx = candleSpacing * (i + 1) + 72;
        const colours = ['#FF6B9D', '#FFD700', '#C44569', '#FF8C42', '#9B59B6'];
        return (
          <g key={i}>
            <rect x={cx - 5} y={122} width={10} height={44} rx={4} fill={colours[i % 5]} />
            <line x1={cx} y1={122} x2={cx} y2={113} stroke="#333" strokeWidth={2} />
            {!sliced && (
              <g style={{ animation: 'flame 0.55s ease-in-out infinite', transformOrigin: `${cx}px 106px` }}>
                <ellipse cx={cx} cy={106} rx={6.5} ry={11}
                  fill="url(#flameGrad)" opacity="0.95"
                  style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }} />
              </g>
            )}
            {sliced && (
              <g opacity="0.45">
                <circle cx={cx} cy={110} r={3} fill="#ccc" />
                <circle cx={cx + 2} cy={103} r={2.5} fill="#ddd" />
                <circle cx={cx - 1} cy={97} r={2} fill="#eee" />
              </g>
            )}
          </g>
        );
      })}

      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="65%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      <text x="200" y="228" textAnchor="middle"
        fontFamily="'Dancing Script', cursive" fontSize="17"
        fill="white" fontWeight="bold" opacity="0.95">
        Happy Birthday! 🎂
      </text>
    </svg>
  );
}

/* ── Cake Section (full page) ───────────────────────────────── */
export default function CakeSection({ config, show, onNext }) {
  const [sliced, setSliced] = useState(false);
  const [cursor, setCursor] = useState({ x: -300, y: -300 });
  const [knifeMode, setKnifeMode] = useState(false);
  const [audioStatus, setAudioStatus] = useState('idle'); // idle | playing | error
  const audioUrl =
    `${import.meta.env.BASE_URL}${config.cake.cuttingAudioUrl.replace(/^\//, '')}`;

  useEffect(() => {
    if (!knifeMode) return;
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [knifeMode]);

  const handleCut = useCallback((e) => {
    if (!knifeMode || sliced) return;
    setSliced(true);
    setKnifeMode(false);
    spawnConfetti(e.clientX, e.clientY);
    setAudioStatus('playing');
    playBirthdayAudio(audioUrl);
  }, [knifeMode, sliced, audioUrl]);

  if (!show) return null;

  return (
    <div className="full-page-section">
      <div className="section-inner">
        <p className="title-script" style={{ marginBottom: '0.4rem' }}>🍰 Time to Cut the Cake! 🍰</p>
        <p className="subtitle" style={{ marginBottom: '1.25rem' }}>
          {knifeMode
            ? '🔪 Hover over the cake and click to make the cut!'
            : sliced
              ? '🎉 The cake is cut — candles blown out!'
              : 'Press the button, grab the knife, and slice into the cake!'}
        </p>

        {/* Cake SVG */}
        <div
          className={`cake-svg-wrapper ${sliced ? 'sliced' : ''} ${!sliced ? 'animate-float' : ''}`}
          onClick={handleCut}
          style={{
            cursor: knifeMode ? 'none' : 'default',
            width: '100%',
            maxWidth: 360,
            marginBottom: '1.25rem',
          }}
        >
          <BirthdayCake sliced={sliced} numCandles={config.cake.candles} />
        </div>

        {/* Controls */}
        {!sliced && (
          <button
            className={`btn ${knifeMode ? 'btn-gold' : 'btn-primary'}`}
            style={{ marginBottom: '0.75rem' }}
            onClick={() => setKnifeMode(v => !v)}
          >
            {knifeMode ? '❌ Cancel' : `🔪 ${config.cake.cakeLabel}`}
          </button>
        )}

        {sliced && (
          <div className="animate-bounce-in" style={{ marginBottom: '1rem' }}>
            <p className="title-script" style={{ fontSize: '1.6rem', color: 'var(--accent)' }}>
              🎂 Cake Cut! Now read your message! 🎂
            </p>
            {audioStatus === 'playing' && (
              <p className="subtitle" style={{ fontSize: '0.8rem', marginTop: '0.35rem' }}>
                🔊 Party music playing…
              </p>
            )}
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={onNext}>
              💌 Read Birthday Message →
            </button>
          </div>
        )}
      </div>

      {/* Knife cursor */}
      {knifeMode && !sliced && (
        <div
          className="custom-cursor"
          style={{ left: cursor.x, top: cursor.y, transform: 'translate(-25%, -75%) rotate(-40deg)' }}
        >
          🔪
        </div>
      )}
    </div>
  );
}
