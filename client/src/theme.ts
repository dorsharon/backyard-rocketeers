import { createTheme, type MantineColorsTuple, rem } from '@mantine/core';

// Custom space-themed color palettes
const cosmicPurple: MantineColorsTuple = [
  '#f3f0ff',
  '#e5dbff',
  '#d0bfff',
  '#b197fc',
  '#9775fa',
  '#845ef7',
  '#7950f2',
  '#7048e8',
  '#6741d9',
  '#5f3dc4',
];

const nebulaPink: MantineColorsTuple = [
  '#fff0f6',
  '#ffdeeb',
  '#fcc2d7',
  '#faa2c1',
  '#f783ac',
  '#f06595',
  '#e64980',
  '#d6336c',
  '#c2255c',
  '#a61e4d',
];

const starfieldBlue: MantineColorsTuple = [
  '#e7f5ff',
  '#d0ebff',
  '#a5d8ff',
  '#74c0fc',
  '#4dabf7',
  '#339af0',
  '#228be6',
  '#1c7ed6',
  '#1971c2',
  '#1864ab',
];

const rocketOrange: MantineColorsTuple = [
  '#fff4e6',
  '#ffe8cc',
  '#ffd8a8',
  '#ffc078',
  '#ffa94d',
  '#ff922b',
  '#fd7e14',
  '#f76707',
  '#e8590c',
  '#d9480f',
];

const martianRed: MantineColorsTuple = [
  '#fff5f5',
  '#ffe3e3',
  '#ffc9c9',
  '#ffa8a8',
  '#ff8787',
  '#ff6b6b',
  '#fa5252',
  '#f03e3e',
  '#e03131',
  '#c92a2a',
];

const alienGreen: MantineColorsTuple = [
  '#ebfbee',
  '#d3f9d8',
  '#b2f2bb',
  '#8ce99a',
  '#69db7c',
  '#51cf66',
  '#40c057',
  '#37b24d',
  '#2f9e44',
  '#2b8a3e',
];

const spaceGray: MantineColorsTuple = [
  '#f8f9fa',
  '#f1f3f5',
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#adb5bd',
  '#868e96',
  '#495057',
  '#343a40',
  '#212529',
];

// Dark theme specific colors
const darkSpace: MantineColorsTuple = [
  '#C1C2C5',
  '#A6A7AB',
  '#909296',
  '#5c5f66',
  '#373A40',
  '#2C2E33',
  '#25262b',
  '#1A1B1E',
  '#141517',
  '#101113',
];

export const theme = createTheme({
  primaryColor: 'cosmicPurple',
  primaryShade: { light: 6, dark: 5 },
  fontFamily: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif',
  headings: {
    fontFamily: '"Orbitron", "Space Grotesk", system-ui, -apple-system, sans-serif',
    fontWeight: '700',
  },
  colors: {
    cosmicPurple,
    nebulaPink,
    starfieldBlue,
    rocketOrange,
    martianRed,
    alienGreen,
    spaceGray,
    darkSpace,
  },
  defaultRadius: 'md',
  cursorType: 'pointer',
  focusRing: 'auto',
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  other: {
    // Gradients
    gradients: {
      space: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      nebula: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      aurora: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
      sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      cosmic: 'linear-gradient(135deg, #7950f2 0%, #e64980 100%)',
      mars: 'linear-gradient(135deg, #ff6b6b 0%, #d9480f 100%)',
      alien: 'linear-gradient(135deg, #51cf66 0%, #0ca678 100%)',
    },
    // Glass effect
    glass: {
      light: 'rgba(255, 255, 255, 0.25)',
      dark: 'rgba(0, 0, 0, 0.25)',
      blur: '10px',
    },
    // Animation durations
    animation: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'filled',
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'md',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        padding: 'lg',
        radius: 'md',
      },
    },
    TextInput: {
      styles: {
        input: {
          transition: 'all 0.2s ease',
        },
      },
    },
    Badge: {
      defaultProps: {
        variant: 'light',
      },
    },
  },
});

// CSS Variables for use in styled components
export const cssVars = {
  // Colors
  '--color-space-bg': '#0f0c29',
  '--color-space-mid': '#302b63',
  '--color-space-light': '#24243e',
  '--color-cosmic-purple': '#7950f2',
  '--color-nebula-pink': '#e64980',
  '--color-star-blue': '#339af0',
  '--color-rocket-orange': '#fd7e14',
  '--color-mars-red': '#fa5252',
  '--color-alien-green': '#40c057',

  // Glass effects
  '--glass-bg-light': 'rgba(255, 255, 255, 0.1)',
  '--glass-bg-dark': 'rgba(0, 0, 0, 0.2)',
  '--glass-border': 'rgba(255, 255, 255, 0.1)',
  '--glass-blur': '10px',

  // Shadows
  '--shadow-glow-purple': '0 0 20px rgba(121, 80, 242, 0.4)',
  '--shadow-glow-pink': '0 0 20px rgba(230, 73, 128, 0.4)',
  '--shadow-glow-blue': '0 0 20px rgba(51, 154, 240, 0.4)',
  '--shadow-glow-orange': '0 0 20px rgba(253, 126, 20, 0.4)',
};
