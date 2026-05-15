import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { AboutTitleAnimation } from "@/components/animation/about-title-animation"

const profileDetails = [
    { label: 'Full Name', value: 'Endra Daniswara' },
    { label: 'Place, Date of Birth', value: 'Kebumen, 21 December 2004' },
    { label: 'Gender', value: 'Male' },
    { label: 'Major', value: 'S1 Informatics Engineering' },
    { label: 'Institution', value: 'Ahmad Dahlan University' },
    { label: 'Main Skills', value: 'Software Development' },
]

export default function AboutSection() {
    return (
        <div className="relative w-full mt-8 lg:mt-16">
            <motion.section
                id="about"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full relative overflow-hidden bg-[#1a0b2e] dark:bg-[#0d1b3e] text-white border border-indigo-500/20 shadow-2xl"
                style={{ clipPath: 'polygon(60px 0, calc(100% - 60px) 0, 100% 60px, 100% calc(100% - 300px), calc(100% - 90px) calc(100% - 300px), calc(100% - 90px) 100%, 60px 100%, 0 calc(100% - 90px), 0 60px)' }}
            >
            {/* Grid background */}
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Glow blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 py-24">
                {/* Top label */}
                <div className="mb-10 w-full text-center">
                    <span className="inline-block text-2xl font-extrabold press-start-2p-regular tracking-[0.35em] uppercase text-indigo-300 px-5 py-2">
                        About Me
                    </span>
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row gap-12 lg:items-stretch">

                    {/* LEFT — Profile Card full height */}
                    <div className="lg:w-[450px] flex flex-col">
                        <Card className="flex-1 bg-white/5 border border-white/10 text-white backdrop-blur-sm hover:border-indigo-500/40 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-500">
                            <CardContent className="pt-8 flex flex-col items-center gap-6 h-full">

                                {/* Avatar — large, centered */}
                                <div className="relative">
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-60 blur-md" />
                                    <Avatar className="relative w-28 h-28 ring-2 ring-indigo-400/50">
                                        <AvatarImage src="/endra-removebg.png" alt="Endra Daniswara" />
                                        <AvatarFallback className="bg-indigo-800 text-white text-3xl font-bold w-28 h-28">
                                            ED
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                {/* Name & role */}
                                <div className="text-center">
                                    <p className="text-2xl goldman-bold text-white tracking-wide">Endra Daniswara</p>
                                    <p className="text-md goldman-regular text-indigo-300 tracking-widest uppercase mt-1">Web Developer</p>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-white/10" />

                                {/* Profile details */}
                                <div className="w-full space-y-3">
                                    {profileDetails.map(({ label, value }) => (
                                        <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 sm:w-40 shrink-0">
                                                {label}
                                            </span>
                                            <span className="text-sm text-slate-300 font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT — Heading + bio */}
                    <div className="flex-[2] space-y-6">
                        <AboutTitleAnimation />

                        <p className="text-justify text-slate-300 text-lg leading-relaxed max-w-xl">
                            Hi, I'm <span className="font-bold text-white">Endra Daniswara</span> — a Web Developer who enjoys building modern and interactive experiences for the web. 
                            Outside of coding, I’m someone who loves exploring new ideas, enjoying good music, and finding inspiration in everyday moments. 
                            Always curious, always learning, and just trying to create things that feel meaningful and fun.
                        </p>
                        {/* Skills tags */}
                    </div>
                </div>
            </div>

            {/* Bottom edge line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            </motion.section>

            {/* Social Media Sidebar Cutout Area */}
            <div className="bg-transparent absolute bottom-0 right-0 w-[90px] h-[300px] flex flex-col items-center justify-center gap-7 border-l border-t border-indigo-500/20 z-20">
               <a href="https://instagram.com" target="_blank" rel="noreferrer" 
                  className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform bg-[#1a0b2e] dark:bg-[#0d1b3e]"
                  style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                   <img src="/instagram.svg" alt="Instagram" className="w-6 h-6 invert" />
               </a>
               <a href="https://linkedin.com" target="_blank" rel="noreferrer" 
                  className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform bg-[#1a0b2e] dark:bg-[#0d1b3e]"
                  style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                   <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6 invert" />
               </a>
               <a href="https://tiktok.com" target="_blank" rel="noreferrer" 
                  className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform bg-[#1a0b2e] dark:bg-[#0d1b3e]"
                  style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                   <img src="/tiktok.svg" alt="TikTok" className="w-6 h-6 invert" />
               </a>
            </div>
        </div>
    );
}
