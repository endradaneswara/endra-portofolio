import { useEffect, useRef } from 'react';
import { animate, scrambleText } from 'animejs';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  chars?: 'uppercase' | 'lowercase' | 'numbers' | 'symbols' | string;
  from?: 'auto' | 'center' | 'left' | 'right' | 'random' | number;
  cursor?: string;
  settleDuration?: number;
  revealRate?: number;
  settleRate?: number;
}

export function ScrambleText({
  text,
  className = '',
  delay = 800,
  chars = 'uppercase',
  from = 'left' as const,
  cursor = '_',
  settleDuration = 600,
  revealRate = 60,
  settleRate = 25,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const runScramble = () => {
    if (!ref.current) return;
    animate(ref.current, {
      innerHTML: scrambleText({
        text,
        chars,
        from,
        cursor,
        settleDuration,
        revealRate,
        settleRate,
      }),
      duration: 2000,
      ease: 'linear',
    });
  };

  useEffect(() => {
    if (!ref.current) return;

    // Set initial text so layout is stable before animation starts
    ref.current.textContent = text;

    // Run first time after delay
    const timer = setTimeout(runScramble, delay);

    // Loop every 15 seconds (in sync with HeroTitle)
    const interval = setInterval(() => {
      // Wait 800ms so the exit animation of the title finishes first
      setTimeout(runScramble, 800);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, delay, chars, from, cursor, settleDuration, revealRate, settleRate]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}