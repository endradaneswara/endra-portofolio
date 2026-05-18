import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const techs = [
  {
    name: 'JavaScript',
    description: 'Dynamic scripting language for the web',
    icon: '/javascript.svg',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript',
    icon: '/typescript.svg',
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'React',
    description: 'Component-based UI library by Meta',
    icon: '/react.svg',
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    name: 'Vite',
    description: 'Lightning fast front-end build tool',
    icon: '/vite.svg',
    color: 'from-purple-400 to-pink-500',
  },
  {
    name: 'Next.js',
    description: 'React framework with SSR & SSG support',
    icon: '/next-js.svg',
    color: 'from-slate-300 to-white',
  },
  {
    name: 'Tailwind',
    description: 'Utility-first CSS framework',
    icon: '/tailwind.svg',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime on the server',
    icon: '/node-js.svg',
    color: 'from-green-400 to-green-600',
  },
]

function TechBadge({ tech }: { tech: typeof techs[number] }) {
  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex-shrink-0 flex flex-col items-center gap-1.5 group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-blue-400 flex items-center justify-center p-2 transition-all duration-200 group-hover:border-white/30 group-hover:bg-white/15 group-hover:scale-110 shadow-lg">
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors duration-200 font-medium">
            {tech.name}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-auto min-w-[160px] bg-slate-900/95 border border-white/10 backdrop-blur-sm text-white shadow-xl"
        side="top"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tech.color} p-1.5 flex-shrink-0`}>
            <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-semibold text-sm">{tech.name}</p>
            <p className="text-xs text-slate-400">{tech.description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function TechMarquee() {
  // Duplicate array for infinite scroll illusion
  const doubled = [...techs, ...techs]

  return (
    <div className="relative overflow-hidden w-full max-w-xl">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-12 z-10 bg-transparent" />
      <div className="absolute right-0 top-0 h-full w-12 z-10 bg-transparent" />
      <div
        className="flex gap-6 py-2 w-max"
        style={{
          animation: 'marquee 20s linear infinite',
        }}
      >
        {doubled.map((tech, i) => (
          <TechBadge key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
