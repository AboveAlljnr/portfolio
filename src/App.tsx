import { ThemeProvider } from './components/ThemeProvider'
import { CursorProvider } from './components/Cursor'
import GrainBlob from './components/GrainBlob'
import StarField from './components/StarField'
import Header from './components/Header'
import Hero from './components/Hero'
import BioCode from './components/BioCode'
import Skills from './components/Skills'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ThemeSwitcher from './components/ThemeSwitcher'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  return (
    <ThemeProvider>
      <CursorProvider>
        {/* Atmospheric layer (z-0) */}
        <GrainBlob />
        <ErrorBoundary>
          <StarField />
        </ErrorBoundary>

        {/* Navigation */}
        <Header />

        {/* Page content (z-10+) */}
        <main>
          <Hero />
          <BioCode />
          <Skills />
          <About />
          <Projects />
        </main>

        <Footer />

        {/* Floating theme picker */}
        <ThemeSwitcher />
      </CursorProvider>
    </ThemeProvider>
  )
}
