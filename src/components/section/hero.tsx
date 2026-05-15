import { Button } from "@/components/ui/button"
import { ProgrammingAnimation, CatTypingAnimation, CodingSlideAnimation } from "@/components/animation/dotLottie"
import { HeroTitle } from "@/components/animation/text-animation"
import { TechMarquee } from "@/components/animation/tech-marquee"
import { ScrambleText } from "@/components/animation/scramble-text"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem-2rem)] mx-2 mt-2 md:mx-4 md:mt-4 lg:mx-6 lg:mt-4 overflow-hidden bg-[#1a0b2e] dark:bg-[#0d1b3e] text-white"
      style={{ clipPath: 'polygon(60px 0, 100% 0, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0 100%, 0 60px)' }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Polygon-like slanted background shape */}
      <div className="absolute right-0 top-0 z-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl filter" />

      <div className="w-full max-w-[90rem] relative z-10 mx-auto px-6 py-16 md:px-12 lg:flex min-h-[calc(100vh-4rem)] lg:items-center lg:py-0">
        {/* Left Content */}
        <div className="flex-1 space-y-8 lg:pr-12">
          {/* Name */}
          <p
            className="text-2xl goldman-bold tracking-[0.2em] uppercase text-indigo-300">
            Endra Daniswara
          </p>

          <h1 className="text-5xl font-bold press-start-2p-regular tracking-tight sm:text-6xl lg:text-7xl">
            <HeroTitle
              line1="Web"
              line2="Developer"
              line2ClassName="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            />
          </h1>

          <p className="max-w-xl font-bold aldrich-regular text-sm text-slate-300 md:text-2xl">
            <ScrambleText
              text="Building modern, responsive, and scalable web experiences"
              chars="uppercase"
              from="left"
              cursor="_"
              settleDuration={500}
              revealRate={60}
              settleRate={30}
              delay={1200}
            />
          </p>

          {/* Tech Stack Marquee */}
          <TechMarquee />

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="bg-transparent border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              View My Projects
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Contact Me
            </Button>
          </div>
        </div>

        {/* Right Content - Triangle Layout with floating animations */}
        <div className="mt-16 flex-1 lg:mt-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-4 w-full max-w-[460px]">

            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent blur-3xl rounded-full pointer-events-none" />

            {/* TOP - Main Lottie Animation (apex of triangle) */}
            <div className="animate-float-1 w-[300px] relative z-10 -mb-4 rounded-2xl overflow-hidden shadow-purple-900/30">
              <ProgrammingAnimation />
            </div>

            {/* BOTTOM - Two animations side by side (base of triangle) */}
            <div className="flex gap-5 w-full justify-center relative z-10">
              {/* Cat typing - bottom left */}
              <div className="animate-float-2 flex-shrink-0 w-[220px] h-[160px] rounded-2xl overflow-hidden shadow-purple-900/30">
                <CatTypingAnimation />
              </div>

              {/* Coding slide - bottom right */}
              <div className="animate-float-3 flex-shrink-0 w-[220px] h-[160px] rounded-2xl overflow-hidden shadow-blue-900/30">
                <CodingSlideAnimation />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
