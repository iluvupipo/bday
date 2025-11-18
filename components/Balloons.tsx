
import React from 'react';

interface BalloonsProps {
  zIndex?: number;
}

export const Balloons: React.FC<BalloonsProps> = ({ zIndex = 0 }) => {
  // Fewer balloons, very slow animation
  const balloons = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    animationDelay: `-${Math.random() * 10}s`,
    duration: 30 + Math.random() * 20, // 30-50 seconds
    color: i % 3 === 0 ? 'fill-rose-200' : i % 3 === 1 ? 'fill-pink-200' : 'fill-red-100',
    scale: 0.8 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen" style={{ zIndex }}>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-[-150px] opacity-80"
          style={{
            left: b.left,
            transform: `scale(${b.scale})`,
            animation: `floatUp ${b.duration}s linear infinite`,
            animationDelay: b.animationDelay,
          }}
        >
          {/* Cute 2D SVG Balloon */}
          <svg width="60" height="80" viewBox="0 0 60 80" className="overflow-visible">
             <path d="M30,0 C50,0 60,20 60,35 C60,55 40,70 32,72 L30,74 L28,72 C20,70 0,55 0,35 C0,20 10,0 30,0 Z" className={b.color} />
             {/* Shine */}
             <ellipse cx="18" cy="18" rx="6" ry="10" fill="rgba(255,255,255,0.4)" transform="rotate(-20 18 18)" />
             {/* String */}
             <path d="M30,74 Q30,90 40,100" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-120vh) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};
