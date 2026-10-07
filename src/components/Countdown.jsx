import { useState, useEffect } from 'react';

function pad(n) { return String(n).padStart(2, '0'); }

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    done:    false,
  };
}

export default function Countdown({ config, onComplete, onNext }) {
  const targetDate = config.person.birthdayDate;
  const [time, setTime] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    if (time.done) { onComplete?.(); return; }
    const id = setInterval(() => {
      const t = getTimeLeft(targetDate);
      setTime(t);
      if (t.done) { clearInterval(id); onComplete?.(); }
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const boxes = [
    { label: 'Days',    value: pad(time.days) },
    { label: 'Hours',   value: pad(time.hours) },
    { label: 'Minutes', value: pad(time.minutes) },
    { label: 'Seconds', value: pad(time.seconds) },
  ];

  return (
    <div className="full-page-section">
      <div className="section-inner">
        <p className="title-script" style={{ marginBottom: '0.5rem' }}>
          🎂 Birthday Countdown 🎂
        </p>
        <h1 className="title-display" style={{ marginBottom: '0.6rem' }}>
          {config.countdown.title}
        </h1>
        <p className="subtitle">{config.countdown.subtitle}</p>

        <div className="divider" />

        {time.done ? (
          <div className="animate-bounce-in" style={{ padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉</div>
            <p className="title-display">It&apos;s Time!</p>
          </div>
        ) : (
          <div className="countdown-grid">
            {boxes.map(({ label, value }) => (
              <div key={label} className="countdown-box animate-pulse-glow">
                <span className="countdown-num">{value}</span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
        )}

        <p className="title-script" style={{ marginTop: '1.25rem', fontSize: '1.4rem' }}>
          For&nbsp;
          <span style={{ color: 'var(--primary)' }}>{config.person.name}</span>
          &apos;s&nbsp;{config.person.age}
          <sup style={{ fontSize: '0.6em' }}>th</sup>&nbsp;Birthday 🌟
        </p>

        {/* Manual next button */}
        <button
          className="btn btn-primary"
          style={{ marginTop: '1.5rem' }}
          onClick={onNext}
        >
          🎉 See the Surprise!
        </button>
      </div>
    </div>
  );
}
