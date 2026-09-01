import { useState } from 'react'
import { THEMES } from '../themes'
import { useTheme } from './ThemeProvider'

export default function ThemeSwitcher() {
  const { themeId, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const accent = (t: string) =>
    THEMES.find((x) => x.id === t)?.tokens['--color-accent-1'] ?? '#fff'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 700,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            padding: 12,
            borderRadius: 14,
            background: 'var(--color-base-2)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            minWidth: 170,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-dim)',
              padding: '2px 4px 6px',
            }}
          >
            Palette
          </span>
          {THEMES.map((t) => {
            const active = t.id === themeId
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 8px',
                  borderRadius: 10,
                  background: 'transparent',
                  border: active ? '1px solid var(--color-lime)' : '1px solid transparent',
                  color: active ? 'var(--color-paper)' : 'var(--color-text-muted)',
                  fontSize: 12,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    gap: 3,
                    flex: 'none',
                  }}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background:
                          t.tokens[`--color-accent-${n}` as keyof typeof t.tokens] ?? '#fff',
                      }}
                    />
                  ))}
                </span>
                {t.name}
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change color theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          borderRadius: 999,
          border: '1px solid var(--color-border)',
          background: 'var(--color-base-2)',
          color: 'var(--color-text-muted)',
          fontSize: 11,
          letterSpacing: '0.08em',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            gap: 3,
          }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: accent(themeId),
              }}
            />
          ))}
        </span>
        THEME
      </button>
    </div>
  )
}
