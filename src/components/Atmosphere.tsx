import { useState, useEffect } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function Atmosphere() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isNight, setIsNight] = useState(false);

  // Generate stable star positions
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (i * 17 + 13) % 100,
      y: (i * 23 + 7) % 100,
      size: (i % 3) + 1,
      delay: (i % 5) * 0.6,
      duration: 3 + (i % 4),
    }))
  );

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsNight(document.documentElement.getAttribute('data-theme') === 'night');
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Day mode: Paper texture */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          opacity: isNight ? 0 : 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          zIndex: 0,
        }}
      />

      {/* Night mode: Background gradient that follows mouse */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: isNight
            ? `radial-gradient(ellipse at ${30 + mousePos.x * 0.08}% ${20 + mousePos.y * 0.08}%, rgba(212, 165, 116, 0.06) 0%, transparent 50%)`
            : 'transparent',
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          zIndex: 0,
        }}
      />

      {/* Night mode: Star field */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          opacity: isNight ? 1 : 0,
          transition: 'opacity 0.6s ease',
          zIndex: 0,
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              background: star.size > 2 ? '#d4a574' : '#f8f6f2',
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Night mode: Mouse-following glow */}
      {isNight && (
        <div
          style={{
            position: 'fixed',
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212, 165, 116, 0.04) 0%, transparent 60%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'left 0.4s ease-out, top 0.4s ease-out',
            zIndex: 0,
          }}
        />
      )}

      {/* Day mode: Decorative margin line */}
      <div
        style={{
          position: 'fixed',
          left: '28px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '1px',
          height: '180px',
          background: 'linear-gradient(180deg, transparent, #d4a574, transparent)',
          opacity: isNight ? 0 : 0.35,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
}
