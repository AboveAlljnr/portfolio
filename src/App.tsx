import { Suspense, lazy } from 'react'
import './index.css'
import { CursorProvider } from './components/Cursor'
import { ThemeProvider } from './components/ThemeProvider'
import GrainBlob from './components/GrainBlob'
import Header from './components/Header'
import Hero from './components/Hero'
import BioCode from './components/BioCode'
import Skills from './components/Skills'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ThemeSwitcher from './components/ThemeSwitcher'
import ErrorBoundary from './components/ErrorBoundary'
import { supportsWebGL } from './hooks/webgl'

const StarField = lazy(() => import('./components/StarField'))

export default function App() {
  const webgl = supportsWebGL()
  return (
    <ThemeProvider>
      <CursorProvider>
        {/* Atmospheric layer (z-0) */}
        <GrainBlob />
        {webgl && (
          <ErrorBoundary>
            <Suspense fallback={null}>
              <StarField />
            </Suspense>
          </ErrorBoundary>
        )}

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
