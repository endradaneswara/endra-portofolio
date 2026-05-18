import React, { useRef, useState, useEffect } from 'react';

const CELL_SIZE = 40;

interface GridBackgroundProps {
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [cellPos, setCellPos] = useState({ x: -9999, y: -9999 });
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsInside(inside);

      if (inside) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
        // Snap to which cell (box) the cursor is in
        setCellPos({
          x: Math.floor(x / CELL_SIZE) * CELL_SIZE,
          y: Math.floor(y / CELL_SIZE) * CELL_SIZE,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* 1. Base dim grid — always visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      />

      {/* 2. Bright grid LINES — circular reveal around cursor, only lines not fill */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          opacity: isInside ? 1 : 0,
          transition: 'opacity 0.5s ease',
          maskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* 3. Active cell highlight — the specific box the cursor is inside */}
      <div
        className="absolute"
        style={{
          // +1 offset so we sit inside the grid line, not on top of it
          left: cellPos.x + 1,
          top: cellPos.y + 1,
          width: CELL_SIZE - 2,
          height: CELL_SIZE - 2,
          opacity: isInside ? 1 : 0,
          // Only animate opacity, not position (instant snap feels natural)
          transition: 'opacity 0.25s ease',
          background:
            'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(99, 102, 241, 0.1))',
          boxShadow:
            'inset 0 0 8px rgba(168, 85, 247, 0.3), inset 0 0 2px rgba(99, 102, 241, 0.4)',
        }}
      />
    </div>
  );
};
