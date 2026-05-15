import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import HeroSection from "@/components/section/hero"
import AboutSection from "@/components/section/about"

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'project', 'contact'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      // If we're at the very top, hero is active
      if (window.scrollY < 50) current = 'hero';
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-white font-sans text-slate-900 dark:bg-[#050505] dark:text-slate-100 transition-colors duration-300 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(100, 80, 160, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 80, 160, 0.15) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full h-16 flex items-stretch text-white">
        {/* Main Navbar Block with slanted cut on the right */}
        <div
          className="relative flex items-center bg-[#1a0b2e] dark:bg-[#0d1b3e] pr-8 md:pr-16"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
        >
          {/* Logo / Brand Block */}
          <div className="flex items-center h-full gap-3 pr-8 md:pr-12">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-[20px] goldman-bold tracking-[0.25em] text-indigo-300">Endra's Space</span>
            </div>
          </div>

          {/* Vertical Purple Line Separator */}
          <Separator orientation="vertical" className="h-full " />

          {/* Navigation Menu */}
          <div className="flex items-center px-4 md:px-8">
            <NavigationMenu className="hidden md:flex ">
              <NavigationMenuList className="gap-2 text-slate-400">
                {[
                  { name: 'Home', href: '#hero' },
                  { name: 'About Me', href: '#about' },
                  { name: 'Projects', href: '#project' },
                  { name: 'Contact', href: '#contact' },
                ].map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      className={`group relative inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm goldman-regular tracking-widest uppercase transition-all duration-200 focus:outline-none bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent
                      ${isActive ? 'text-white after:w-4/5' : 'text-slate-400 hover:text-white hover:after:w-4/5'}
                      after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:transition-all after:duration-300 rounded-sm focus:text-white`}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )})}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile menu */}
            <div className="md:hidden ml-auto">
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">Menu</Button>
            </div>
          </div>
        </div>

        {/* Right side - ModeToggle */}
        <div className="flex-1 flex items-center justify-end px-6 border-b border-black/10">
          <ModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* About Me Section */}
      <AboutSection />

    </div>
  )
}
