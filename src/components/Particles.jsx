import { useEffect, useRef } from 'react';

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const emojis = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🎈', '🎀', '💖', '🌸'];

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -Math.random() * 0.5 - 0.2,
      size: Math.random() * 16 + 8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      alpha: Math.random() * 0.5 + 0.1,
      alphaDir: (Math.random() - 0.5) * 0.008,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;
        if (p.alpha > 0.6 || p.alpha < 0.05) p.alphaDir *= -1;
        if (p.y < -40) { p.y = canvas.height + 40; p.x = Math.random() * canvas.width; }
        if (p.x < -40) p.x = canvas.width + 40;
        if (p.x > canvas.width + 40) p.x = -40;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.emoji, p.x, p.y);
        ctx.restore();
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return <canvas ref={canvasRef} id="particles-canvas" />;
}
