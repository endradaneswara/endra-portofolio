import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const ProgrammingAnimation = () => {
  return (
    <DotLottieReact
      src="/Programming%20Computer.lottie"
      loop
      autoplay
      style={{ width: '120%', height: '120%' }}
      renderConfig={{
        devicePixelRatio: window.devicePixelRatio * 2,
      }}
    />
  );
};

export const CatTypingAnimation = () => {
  return (
    <DotLottieReact
      src="/Cat%20typing.lottie"
      loop
      autoplay
      style={{ width: '120%', height: '120%'}}
      renderConfig={{
        devicePixelRatio: window.devicePixelRatio * 2,
      }}
    />
  );
};

export const CodingSlideAnimation = () => {
  return (
    <DotLottieReact
      src="/Coding%20Slide.lottie"
      loop
      autoplay
      style={{ width: '120%', height: '120%'}}
      renderConfig={{
        devicePixelRatio: window.devicePixelRatio * 2,
      }}
    />
  );
};

