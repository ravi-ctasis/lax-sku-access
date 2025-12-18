import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

// Snowflake component
const Snowflake = ({ style }: { style: React.CSSProperties }) => (
  <div 
    className="fixed pointer-events-none text-white opacity-80 animate-snowfall z-50"
    style={style}
  >
    ❄
  </div>
);

// Christmas lights component
const ChristmasLights = () => (
  <div className="fixed top-0 left-0 right-0 h-8 pointer-events-none z-40 overflow-hidden">
    <div className="flex justify-center gap-4 animate-pulse">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-4 rounded-full animate-twinkle"
          style={{
            backgroundColor: ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff'][i % 5],
            animationDelay: `${i * 0.2}s`,
            boxShadow: `0 0 10px ${['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff'][i % 5]}`
          }}
        />
      ))}
    </div>
  </div>
);

// Corner decorations
const CornerDecoration = ({ position }: { position: 'left' | 'right' }) => (
  <div 
    className={`fixed top-16 ${position === 'left' ? 'left-2' : 'right-2'} pointer-events-none z-30`}
  >
    {/* <div className="text-4xl animate-swing">
      {position === 'left' ? '🎄' : '🎅'}
    </div> */}
  </div>
);

// Santa sleigh flying across
const FlyingSanta = () => {
  const [position, setPosition] = useState(-200);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev > window.innerWidth + 200) return -200;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed top-24 pointer-events-none z-30 text-4xl"
      style={{ left: position, transition: 'none' }}
    >
      {/* 🛷🎅 */}
    </div>
  );
};

export function ChristmasDecorations() {
  const { theme } = useTheme();
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    if (theme !== 'christmas') {
      setSnowflakes([]);
      return;
    }

    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 15 + 10}px`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
      }
    }));
    setSnowflakes(initialSnowflakes);

    // Add new snowflakes periodically
    const interval = setInterval(() => {
      setSnowflakes(prev => {
        const newFlake = {
          id: Date.now(),
          style: {
            left: `${Math.random() * 100}%`,
            top: '-20px',
            fontSize: `${Math.random() * 15 + 10}px`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: '0s',
          }
        };
        // Keep max 80 snowflakes
        const updated = [...prev, newFlake].slice(-80);
        return updated;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [theme]);

  if (theme !== 'christmas') return null;

  return (
    <>
      {/* Snowfall */}
      {snowflakes.map(flake => (
        <Snowflake key={flake.id} style={flake.style} />
      ))}
      
      {/* Christmas lights at top */}
      <ChristmasLights />
      
      {/* Corner decorations */}
      <CornerDecoration position="left" />
      <CornerDecoration position="right" />
      
      {/* Flying Santa (appears occasionally) */}
      <FlyingSanta />
      
      {/* Bottom decorations */}
      {/* <div className="fixed bottom-4 left-4 pointer-events-none z-30 text-3xl animate-bounce">
        
      </div> */}
      <div className="fixed bottom-4 right-4 pointer-events-none z-30 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>
        🎁
      </div>
      {/* <div className="fixed bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-30 text-2xl">
        ⛄ 🦌 🔔
      </div> */}
    </>
  );
}
