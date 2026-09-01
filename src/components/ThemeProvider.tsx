import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY, getThemeTokens } from '../themes'

interface ThemeContextValue {
  themeId: string
  setTheme: (id: string) => void
  accent: (index: 1 | 2 | 3 | 4 | 5) => string
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: DEFAULT_THEME,
  setTheme: () => {},
  accent: () => '',
})

function applyTokens(tokens: Record<string, string>) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(key, value)
  }
}

function readStored(): string {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored && THEMES.some((t) => t.id === stored)) return stored
  } catch {
    // ignore storage errors
  }
  return DEFAULT_THEME
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => readStored())

  // Apply the active theme's tokens to :root on mount and whenever it changes.
  useEffect(() => {
    const theme = getThemeTokens(themeId)
    applyTokens(theme.tokens)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId)
    } catch {
      // ignore storage errors
    }
  }, [themeId])

  const setTheme = useCallback((id: string) => {
    setThemeId(id)
  }, [])

  const accent = useCallback((index: 1 | 2 | 3 | 4 | 5) => {
    const theme = getThemeTokens(themeId)
    return theme.tokens[`--color-accent-${index}`] ?? theme.tokens['--color-accent-1'] ?? ''
  }, [themeId])

  return (
    <ThemeContext.Provider value={{ themeId, setTheme, accent }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}
