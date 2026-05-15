import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ui/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative w-12 h-12 border-none bg-gradient-to-br from-indigo-700 to-purple-800 hover:from-indigo-600 hover:to-purple-600 text-purple-100 hover:text-white transition-all duration-300 flex items-center justify-center"
          style={{
            clipPath: 'polygon(35% 15%, 65% 15%, 100% 70%, 85% 100%, 15% 100%, 0% 70%)',
            filter: 'drop-shadow(0 0 8px rgba(44, 14, 72, 0.6))'
          }}
        >
          <Sun className="absolute h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 mt-1.5" />
          <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 mt-1.5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}