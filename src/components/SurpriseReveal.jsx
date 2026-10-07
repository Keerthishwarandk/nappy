/* ──────────────────────────────────────────────────────────
   Mini Calendar component — birthday date highlighted in ❤️
   ────────────────────────────────────────────────────────── */

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function MiniCalendar({ birthdayDateStr }) {
  const date     = new Date(birthdayDateStr);
  const bdYear   = date.getFullYear();
  const bdMonth  = date.getMonth(); // 0-indexed
  const bdDay    = date.getDate();

  // First weekday of the birthday month
  const firstWeekDay = new Date(bdYear, bdMonth, 1).getDay();
  // Total days in that month
  const daysInMonth  = new Date(bdYear, bdMonth + 1, 0).getDate();

  // Build grid cells: leading blanks + day numbers
  const cells = [
    ...Array(firstWeekDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="mini-calendar">
      {/* Month + Year header */}
      <div className="cal-header">
        <span className="cal-month">{MONTH_NAMES[bdMonth]}</span>
        <span className="cal-year">{bdYear}</span>
      </div>

      {/* Weekday labels */}
      <div className="cal-grid">
        {DAY_NAMES.map(d => (
          <div key={d} className="cal-day-label">{d}</div>
        ))}

        {/* Day cells */}
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} className="cal-cell empty" />;
          const isBd = day === bdDay;
          return (
            <div key={idx} className={`cal-cell ${isBd ? 'birthday-day' : ''}`}>
              {isBd ? (
                <span className="heart-cell">
                  <span className="heart-icon">❤️</span>
                  <span className="heart-date">{day}</span>
                </span>
              ) : (
                <span>{day}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <p className="cal-legend">❤️ = Birthday!</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Age Badge — left column
   ────────────────────────────────────────────────────────── */
function AgeBadge({ name, age }) {
  const ordinal = (n) => {
    const s = ['th','st','nd','rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="age-badge">
      {/* Glowing ring */}
      <div className="age-ring">
        <div className="age-ring-inner">
          <span className="age-number">{age}</span>
          <span className="age-label">years</span>
          <span className="age-young">young 🌟</span>
        </div>
      </div>

      <p className="age-name">{name}</p>
      <p className="age-ordinal">Celebrating your</p>
      <p className="age-ordinal-num">{ordinal(age)} Birthday 🎂</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Surprise Reveal — two-column (age + calendar)
   ────────────────────────────────────────────────────────── */
export default function SurpriseReveal({ config, show, onReveal }) {
  if (!show) return null;

  const { name, age, birthdayDate } = config.person;

  return (
    <div className="full-page-section" style={{ alignItems: 'flex-start', paddingTop: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 860, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

        {/* ── Top headline ──────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            🎊🎂🎉
          </div>
          <h1 className="title-display" style={{ marginBottom: '0.3rem' }}>
            {config.surpriseMessage.headline}
          </h1>
          <p className="title-script" style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.9rem)' }}>
            {config.surpriseMessage.subheadline}
          </p>
        </div>

        {/* ── Two-column: Age | Calendar ────────────── */}
        <div className="surprise-split">
          {/* Left — Age */}
          <div className="surprise-col">
            <AgeBadge name={name} age={age} />
          </div>

          {/* Vertical divider (desktop) */}
          <div className="surprise-divider-v" />

          {/* Right — Calendar */}
          <div className="surprise-col">
            <p className="col-heading">🗓️ The Special Day</p>
            <MiniCalendar birthdayDateStr={birthdayDate} />
          </div>
        </div>

        {/* ── Tagline + CTA ──────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <p className="subtitle" style={{ marginBottom: '1.25rem' }}>
            {config.surpriseMessage.tagline}
          </p>
          <button
            className="btn btn-primary"
            style={{ fontSize: '1.1rem', padding: '1rem 2.75rem' }}
            onClick={onReveal}
          >
            🎁 Let&apos;s Cut the Cake!
          </button>
        </div>
      </div>
    </div>
  );
}
