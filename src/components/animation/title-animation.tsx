import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export const AboutTitleAnimation = () => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const LOOP_INTERVAL = 15000;
  const EXIT_DURATION = 500;
  const ENTER_DURATION = 800;
  const EXIT_OFFSET = EXIT_DURATION + 200;

  const getWords = () =>
    containerRef.current
      ? Array.from(containerRef.current.querySelectorAll<HTMLElement>('.word'))
      : [];

  const resetWords = () => {
    getWords().forEach((w) => {
      w.style.opacity = '0';
      w.style.transform = 'translateY(50px)';
    });
  };

  const runEnter = () =>
    animate(getWords(), {
      y: ['50px', '0px'],
      opacity: [0, 1],
      duration: ENTER_DURATION,
      ease: 'out(4)',
      delay: stagger(60, { start: 0 }),
    });

  const runExit = () =>
    animate(getWords(), {
      y: ['0px', '-50px'],
      opacity: [1, 0],
      duration: EXIT_DURATION,
      ease: 'in(3)',
      delay: stagger(40, { start: 0 }),
    });

  const stopAll = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (enterTimeoutRef.current) { clearTimeout(enterTimeoutRef.current); enterTimeoutRef.current = null; }
    if (loopDelayRef.current) { clearTimeout(loopDelayRef.current); loopDelayRef.current = null; }
  };

  const startLoop = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      runExit();
      // Reset words to start position BEFORE running enter so anime.js
      // always animates from translateY(50px) → 0, not from -50px → 0.
      enterTimeoutRef.current = setTimeout(() => {
        resetWords();
        runEnter();
      }, EXIT_OFFSET);
    }, LOOP_INTERVAL);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start fully hidden
    resetWords();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Cancel any leftover timers, reset words, then play entrance
          stopAll();
          resetWords();
          runEnter();
          // After the first full cycle, kick off the 15 s loop
          loopDelayRef.current = setTimeout(() => {
            startLoop();
          }, LOOP_INTERVAL);
        } else {
          // Left the viewport — stop everything so it replays on re-entry
          stopAll();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      stopAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── word component ─────────────────────────────────────────────────────────

  const Word = ({ text, className = '' }: { text: string; className?: string }) => (
    <span style={{ display: 'inline-block', overflow: 'hidden', lineHeight: '1.2' }}>
      <span
        className={`word ${className}`}
        style={{
          display: 'inline-block',
          opacity: 0,
          transform: 'translateY(50px)',
          willChange: 'transform, opacity',
        }}
      >
        {text}
      </span>
    </span>
  );

  const blue = 'text-transparent bg-clip-text russo-one-regular bg-gradient-to-r from-indigo-400 to-blue-400';
  const purple = 'text-transparent bg-clip-text rubik-mono-one-regular bg-gradient-to-r from-purple-400 to-indigo-400 text-3xl';

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <h2
      ref={containerRef}
      className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.2]"
    >
      {/* Line 1 — "Fan of good music" */}
      <Word text="Fan" />{' '}
      <Word text="of" />{' '}
      <Word text="good" className={blue} />{' '}
      <Word text="music" className={blue} />{' '}

      <br />

      {/* Line 2 — "good vibes and meaningful conversations" */}
      <Word text="good" className={purple} />{' '}
      <Word text="vibes" className={purple} />{' '}
      <Word text="and" />{' '}
      <Word text="meaningful" className={blue} />{' '}
      <Word text="conversations" className={purple} />
    </h2>
  );
};
