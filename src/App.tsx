import Home from "./components/pages/home"
import { ThemeProvider } from "./components/ui/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Home/>
    </ThemeProvider>
  )
}

export default App
