// FinSys VA — Tailwind CDN config (M3 palette, shadows, animations)
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        // Material Design 3 (M3) Custom Palette
        m3: {
          primary: '#00629D',
          onPrimary: '#FFFFFF',
          primaryContainer: '#CFE5FF',
          onPrimaryContainer: '#001D34',
          secondary: '#51606F',
          onSecondary: '#FFFFFF',
          secondaryContainer: '#D5E4F6',
          onSecondaryContainer: '#0E1D2A',
          tertiary: '#695779',
          tertiaryContainer: '#F0DBFF',
          onTertiaryContainer: '#241532',
          error: '#BA1A1A',
          errorContainer: '#FFDAD6',
          onErrorContainer: '#410002',
          surface: '#FDFDFF',
          onSurface: '#1A1C1E',
          surfaceVariant: '#DFE2E6',
          onSurfaceVariant: '#43474E',
          outline: '#73777F',
          surfaceContainerLowest: '#FFFFFF',
          surfaceContainerLow: '#F8F9FC',
          surfaceContainer: '#F2F4F7',
          surfaceContainerHigh: '#ECEEF1',
          surfaceContainerHighest: '#E6E8EB',
        }
      },
      boxShadow: {
        'm3-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'm3-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'm3-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'fade-up': {
          '0%': { filter: 'blur(4px)', transform: 'translateY(12px)', opacity: '0' },
          '100%': { filter: 'blur(0px)', transform: 'translateY(0)', opacity: '1' },
        }
      },
    }
  }
}
