import { motion } from "framer-motion"
import { GridBackground } from "@/components/animation/grid-background"
import { ScrambleText } from "@/components/animation/scramble-text"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

/* ─── Data ───────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: "Supply Chain DApp",
    description:
      "Decentralized supply chain management system built with Ethereum smart contracts, IPFS for file storage, and a modern Next.js frontend with real-time blockchain monitoring.",
    tags: ["Next.js", "Solidity", "IPFS", "Wagmi", "Prisma"],
    github: "https://github.com",
    live: "https://example.com",
    accent: "from-indigo-500 to-blue-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React, Vite, and anime.js. Features interactive grid backgrounds, scroll-triggered animations, scramble text effects, and dark/light mode.",
    tags: ["React", "Vite", "anime.js", "Tailwind", "TypeScript"],
    github: "https://github.com",
    live: "https://example.com",
    accent: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: 3,
    title: "Web App Project",
    description:
      "A modern web application with clean UI and responsive design. Built with performance and accessibility in mind using the latest web technologies.",
    tags: ["React", "Node.js", "PostgreSQL", "REST API"],
    github: "https://github.com",
    live: "https://example.com",
    accent: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
]

const certificates = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "2024",
    credential: "https://dicoding.com",
    accent: "from-indigo-500 to-blue-500",
    glowColor: "rgba(99, 102, 241, 0.35)",
    category: "Frontend",
  },
  {
    id: 2,
    title: "React & Modern JavaScript",
    issuer: "Dicoding Indonesia",
    date: "2024",
    credential: "https://dicoding.com",
    accent: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.35)",
    category: "Frontend",
  },
  {
    id: 3,
    title: "Back-End Development",
    issuer: "Dicoding Indonesia",
    date: "2024",
    credential: "https://dicoding.com",
    accent: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.35)",
    category: "Backend",
  },
]

const techGroups = [
  {
    label: "Frontend",
    accent: "from-indigo-500 to-blue-500",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "anime.js"],
  },
  {
    label: "Backend",
    accent: "from-purple-500 to-indigo-500",
    techs: ["Node.js", "Express.js", "Prisma", "PostgreSQL", "REST API"],
  },
  {
    label: "Blockchain",
    accent: "from-blue-500 to-cyan-500",
    techs: ["Solidity", "Ethereum", "IPFS", "Wagmi", "Hardhat", "Ethers.js"],
  },
  {
    label: "Tools",
    accent: "from-pink-500 to-purple-500",
    techs: ["Git", "GitHub", "VS Code", "Figma", "Vercel"],
  },
]

/* ─── Animation variants ─────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

/* ─── Component ─────────────────────────────────────────── */
export default function ProjectSection() {
  return (
    <motion.section
      id="project"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden bg-[#1a0b2e] dark:bg-[#0d1b3e] text-white mt-8 lg:mt-16 border border-indigo-500/20 shadow-2xl"
      style={{
        clipPath:
          "polygon(60px 0, calc(100% - 60px) 0, 100% 60px, 100% calc(100% - 60px), calc(100% - 60px) 100%, 60px 100%, 0 calc(100% - 60px), 0 60px)",
      }}
    >
      <GridBackground />

      {/* Glow blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-20 py-24">

        {/* Section heading */}
        <div className="mb-10 w-full text-center">
          <span className="text-2xl font-bold press-start-2p-regular tracking-[0.3em] uppercase text-purple-300 px-5 py-2 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
            Projects
          </span>
        </div>

        {/* ── Tabs ─────────────────────────────────────────── */}
        <Tabs defaultValue="project">

          {/* Tab navigation */}
          <TabsList
            variant="line"
            className="mb-10 w-full justify-start border-b border-indigo-500/20 rounded-none bg-purple-500/10 pb-0 h-auto gap-0"
          >
            {[
              { value: "project",     label: "Project"     },
              { value: "certificate", label: "Certificate" },
              { value: "tech",        label: "Tech"        },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                  rounded-none px-6 py-2.5 text-sm aldrich-regular tracking-widest uppercase
                  text-slate-400 hover:text-purple-300
                  data-[state=active]:text-purple-300 data-[state=active]:font-bold
                  data-[state=active]:border-b-2 data-[state=active]:border-purple-400
                  transition-all duration-300 bg-transparent
                "
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Tab: Project ─────────────────────────────── */}
          <TabsContent value="project">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={cardVariants}
                >
                  <Card
                    className="group relative h-full flex flex-col bg-white/5 border border-white/10 text-white backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-500 overflow-hidden"
                    style={{ "--glow": project.glowColor, boxShadow: "none" } as React.CSSProperties}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.glowColor}`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div className={`h-[2px] w-full bg-gradient-to-r ${project.accent} opacity-80`} />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at top left, ${project.glowColor.replace("0.4", "0.08")}, transparent 70%)` }}
                    />
                    <CardContent className="flex flex-col gap-5 p-6 h-full">
                      <span className={`text-5xl font-extrabold bg-gradient-to-r ${project.accent} bg-clip-text text-transparent select-none leading-none`}>
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold goldman-bold tracking-wide text-white group-hover:text-indigo-200 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 aldrich-regular leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] border-indigo-500/40 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button size="sm" asChild className={`flex-1 bg-gradient-to-r ${project.accent} hover:opacity-90 text-white border-0 text-xs tracking-widest transition-all duration-300 hover:scale-105`}>
                          <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a>
                        </Button>
                        <Button size="sm" variant="outline" asChild className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 text-xs tracking-widest transition-all duration-300 hover:scale-105">
                          <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ── Tab: Certificate ─────────────────────────── */}
          <TabsContent value="certificate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={cardVariants}
                >
                  <Card
                    className="group relative h-full flex flex-col bg-white/5 border border-white/10 text-white backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
                    style={{ boxShadow: "none" } as React.CSSProperties}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${cert.glowColor}`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div className={`h-[2px] w-full bg-gradient-to-r ${cert.accent} opacity-80`} />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at top left, ${cert.glowColor.replace("0.35", "0.07")}, transparent 70%)` }}
                    />
                    <CardContent className="flex flex-col gap-4 p-6 h-full">
                      {/* Certificate badge icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.accent} flex items-center justify-center text-2xl shadow-lg`}>
                        🏆
                      </div>
                      <div>
                        <Badge variant="outline" className="text-[9px] mb-2 border-purple-500/30 text-purple-300 bg-purple-500/10">
                          {cert.category}
                        </Badge>
                        <h3 className="text-base font-bold goldman-bold tracking-wide text-white group-hover:text-purple-200 transition-colors duration-300 leading-snug">
                          {cert.title}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <p className="text-xs text-slate-400 aldrich-regular">
                          <span className="text-indigo-400">Issuer:</span> {cert.issuer}
                        </p>
                        <p className="text-xs text-slate-400 aldrich-regular">
                          <span className="text-indigo-400">Year:</span> {cert.date}
                        </p>
                      </div>
                      <Button size="sm" asChild className={`w-full bg-gradient-to-r ${cert.accent} hover:opacity-90 text-white border-0 text-xs tracking-widest transition-all duration-300 hover:scale-105`}>
                        <a href={cert.credential} target="_blank" rel="noreferrer">View Credential</a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ── Tab: Tech ────────────────────────────────── */}
          <TabsContent value="tech">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {techGroups.map((group, i) => (
                <motion.div
                  key={group.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={cardVariants}
                >
                  <Card
                    className="group h-full bg-white/5 border border-white/10 text-white backdrop-blur-sm hover:border-indigo-500/40 transition-all duration-500 overflow-hidden"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(99,102,241,0.25)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div className={`h-[2px] w-full bg-gradient-to-r ${group.accent}`} />
                    <CardContent className="p-5 flex flex-col gap-4">
                      <h4 className={`text-sm font-bold press-start-2p-regular bg-gradient-to-r ${group.accent} bg-clip-text text-transparent`}>
                        {group.label}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.techs.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-[10px] border-white/15 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white transition-colors aldrich-regular"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    </motion.section>
  )
}
