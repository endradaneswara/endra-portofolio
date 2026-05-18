import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

// ─── SplitWrapText ────────────────────────────────────────────────────────────

interface SplitWrapTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}

/**
 * SplitWrapText — inline horizontal text, each char slides up on scroll.
 */
export const SplitWrapText = ({
  text,
  className = '',
  delay = 0,
  duration = 750,
  staggerDelay = 55,
  once = true,
  threshold = 0.3,
}: SplitWrapTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated  = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Manually split into char spans so we don't depend on splitText DOM behaviour
    const chars = Array.from(el.querySelectorAll<HTMLElement>('.swt-char'));
    chars.forEach((c) => {
      c.style.transform = 'translateY(100%)';
      c.style.opacity   = '0';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          hasAnimated.current = true;
          animate(chars, {
            y: ['100%', '0%'],
            opacity: [0, 1],
            duration,
            ease: 'out(3)',
            delay: stagger(staggerDelay, { start: delay }),
          });
        } else if (!entry.isIntersecting && !once) {
          hasAnimated.current = false;
          chars.forEach((c) => {
            c.style.transform = 'translateY(100%)';
            c.style.opacity   = '0';
          });
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <span
            className="swt-char"
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
};

// ─── VerticalLetters ─────────────────────────────────────────────────────────

interface VerticalLettersProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  threshold?: number;
}

/**
 * VerticalLetters — each character on its own line (stacked vertically).
 * Slides in on scroll-into-view, then loops exit → reset → enter every 15 s.
 */
export const VerticalLetters = ({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  duration = 600,
  staggerDelay = 55,
  threshold = 0.15,
}: VerticalLettersProps) => {
  const containerRef    = useRef<HTMLDivElement>(null);
  const intervalRef     = useRef<ReturnType<typeof setInterval>  | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout>   | null>(null);
  const loopDelayRef    = useRef<ReturnType<typeof setTimeout>   | null>(null);

  const LOOP_INTERVAL = 15_000;
  const EXIT_DURATION = 450;
  const EXIT_OFFSET   = EXIT_DURATION + 200;

  const getChars = () =>
    containerRef.current
      ? Array.from(containerRef.current.querySelectorAll<HTMLElement>('.vl-char'))
      : [];

  const resetChars = () =>
    getChars().forEach((c) => {
      c.style.transform = 'translateY(110%)';
      c.style.opacity   = '0';
    });

  const runEnter = () =>
    animate(getChars(), {
      y:       ['110%', '0%'],
      opacity: [0, 1],
      duration,
      ease:    'out(3)',
      delay:   stagger(staggerDelay, { start: delay }),
    });

  const runExit = () =>
    animate(getChars(), {
      y:        ['0%', '-110%'],
      opacity:  [1, 0],
      duration: EXIT_DURATION,
      ease:     'in(3)',
      delay:    stagger(30, { start: 0 }),
    });

  const stopAll = () => {
    if (intervalRef.current)     { clearInterval(intervalRef.current);   intervalRef.current     = null; }
    if (enterTimeoutRef.current) { clearTimeout(enterTimeoutRef.current); enterTimeoutRef.current = null; }
    if (loopDelayRef.current)    { clearTimeout(loopDelayRef.current);    loopDelayRef.current    = null; }
  };

  const startLoop = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      runExit();
      enterTimeoutRef.current = setTimeout(() => {
        resetChars();
        runEnter();
      }, EXIT_OFFSET);
    }, LOOP_INTERVAL);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    resetChars();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stopAll();
          resetChars();
          runEnter();
          loopDelayRef.current = setTimeout(startLoop, LOOP_INTERVAL);
        } else {
          stopAll();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => { observer.disconnect(); stopAll(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col items-center ${className}`}>
      {text.split('').map((char, i) => (
        <div key={i} style={{ overflow: 'hidden', lineHeight: '1.3' }}>
          <span
            className={`vl-char block text-center ${charClassName}`}
            style={{ willChange: 'transform, opacity' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </div>
      ))}
    </div>
  );
};