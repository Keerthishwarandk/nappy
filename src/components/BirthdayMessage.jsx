import { useState, useEffect, useRef } from 'react';

/* Speed: ms per character */
const TYPING_SPEED = 28;

export default function BirthdayMessage({ config, show, onNext }) {
  const [revealed, setRevealed] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typeDone, setTypeDone] = useState(false);
  const timerRef = useRef(null);
  const fullText = config.birthdayMessage.message;

  /* ── Start / stop typewriter when banner is revealed ── */
  useEffect(() => {
    if (!revealed) {
      // Reset when closed
      setDisplayed('');
      setIsTyping(false);
      setTypeDone(false);
      clearInterval(timerRef.current);
      return;
    }

    // Begin typing
    setDisplayed('');
    setTypeDone(false);
    setIsTyping(true);

    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timerRef.current);
        setIsTyping(false);
        setTypeDone(true);
      }
    }, TYPING_SPEED);

    return () => clearInterval(timerRef.current);
  }, [revealed, fullText]);

  /* Skip to end instantly */
  const skipTyping = () => {
    clearInterval(timerRef.current);
    setDisplayed(fullText);
    setIsTyping(false);
    setTypeDone(true);
  };

  if (!show) return null;

  return (
    <div className="full-page-section">
      <div className="section-inner" style={{ maxWidth: 780 }}>

        <p className="title-script" style={{ marginBottom: '0.4rem' }}>
          💌 A Special Letter For You
        </p>

        {!revealed ? (
          <>
            <p className="subtitle" style={{ margin: '0.5rem auto 1.75rem', maxWidth: 460 }}>
              There&apos;s something heartfelt waiting just for you.
              <br />Tap below to unwrap it 💖
            </p>

            {/* Floating envelope */}
            <div style={{ fontSize: '6rem', margin: '1.25rem 0', animation: 'float 3s ease-in-out infinite' }}>
              💌
            </div>

            <button className="btn btn-gold" onClick={() => setRevealed(true)}>
              {config.birthdayMessage.buttonLabel}
            </button>
          </>
        ) : (
          <div className="animate-fade-in-up" style={{ width: '100%' }}>

            {/* Floating emoji garland */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '1.35rem', marginBottom: '1rem' }}>
              {'🎉🎊🌟💖🌸💫🎀🎊🎉'.split('').map((e, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  animation: `float ${2 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.09}s`,
                }}>{e}</span>
              ))}
            </div>

            {/* ── Typewriter message banner ── */}
            <div className="message-banner">
              {/* Pre-formatted text with cursor */}
              <span className="typewriter-text">{displayed}</span>
              {isTyping && <span className="typewriter-cursor" />}
            </div>

            {/* Skip / typing progress */}
            {isTyping && (
              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }} onClick={skipTyping}>
                  ⏭ Skip to end
                </button>
              </div>
            )}

            {/* Action buttons — only visible when typing is done */}
            {typeDone && (
              <div
                className="animate-fade-in-up"
                style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}
              >
                <button className="btn btn-outline" onClick={() => setRevealed(false)}>
                  💌 Close Letter
                </button>
                <button className="btn btn-primary" onClick={onNext}>
                  📸 See Photo Booth →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
