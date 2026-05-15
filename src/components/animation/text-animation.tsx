import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface HeroTitleProps {
  line1: string;
  line2: string;
  line2ClassName?: string;
}

export const HeroTitle = ({ line1, line2, line2ClassName = '' }: HeroTitleProps) => {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const LOOP_INTERVAL = 15000; // 15 seconds
  const EXIT_DURATION = 600;
  const ENTER_DURATION = 900;

  const runEnter = () => {
    const targets = [line1Ref.current, line2Ref.current].filter(Boolean);
    animate(targets, {
      y: ['60px', '0px'],
      opacity: [0, 1],
      duration: ENTER_DURATION,
      ease: 'out(4)',
      delay: stagger(200, { start: 0 }),
    });
  };

  const runExit = () => {
    const targets = [line1Ref.current, line2Ref.current].filter(Boolean);
    animate(targets, {
      y: ['0px', '-60px'],
      opacity: [1, 0],
      duration: EXIT_DURATION,
      ease: 'in(3)',
      delay: stagger(100, { start: 0 }),
    });
  };

  useEffect(() => {
    // Initial entrance animation
    const targets = [line1Ref.current, line2Ref.current].filter(Boolean);
    animate(targets, {
      y: ['60px', '0px'],
      opacity: [0, 1],
      duration: ENTER_DURATION,
      ease: 'out(4)',
      delay: stagger(200, { start: 200 }),
    });

    // Loop every 15 seconds: slide out → slide in
    const interval = setInterval(() => {
      runExit();
      setTimeout(() => {
        runEnter();
      }, EXIT_DURATION + 200);
    }, LOOP_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span
        ref={line1Ref}
        className="block"
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
        {line1}
      </span>
      <span
        ref={line2Ref}
        className={`block ${line2ClassName}`}
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
        {line2}
      </span>
    </>
  );
};
