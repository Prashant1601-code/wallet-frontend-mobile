// constants/colors.js
const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};
const sunsetTheme = {
  primary: "#FF7043", // Orange coral
  background: "#FFF3E0", // Cream background
  text: "#BF360C", // Deep burnt orange
  border: "#FFE0B2",
  white: "#FFFFFF",
  textLight: "#FFAB91", // Peach accent
  expense: "#E53935", // Bright red
  income: "#43A047", // Green
  card: "#FFFFFF",
  shadow: "#00000040",
};
const midnightTheme = {
  primary: "#2196F3", // Vibrant blue
  background: "#0A192F", // Deep navy background
  text: "#1587d8ff", // Light text
  border: "#112240", // Subtle blue-gray
  white: "#FFFFFF",
  textLight: "#64B5F6", // Soft blue highlight
  expense: "#FF5252", // Vivid red
  income: "#00E676", // Bright green
  card: "#112240",
  shadow: "#000000",
};
const mintTheme = {
  primary: "#26A69A", // Teal green
  background: "#E0F2F1", // Soft mint background
  text: "#004D40", // Dark teal text
  border: "#B2DFDB",
  white: "#FFFFFF",
  textLight: "#80CBC4", // Light mint
  expense: "#EF5350", // Red for expenses
  income: "#66BB6A", // Green for income
  card: "#FFFFFF",
  shadow: "#00000030",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
};
// constants/theme.js
const darkTheme = {
  primary: "#2196F3", // Bright blue for highlights/buttons
  background: "#0A192F", // Deep navy background
  text: "#E3F2FD", // Light text for readability
  border: "#1E2A3E", // Muted blue-gray for borders
  white: "#FFFFFF",
  textLight: "#90CAF9", // Soft blue for secondary text
  expense: "#FF5252", // Bright red for expenses
  income: "#00E676", // Neon green for income
  card: "#112240", // Card background
  shadow: "#000000", // Default shadow
}; // constants/theme.js
const blackTheme = {
  primary: "#2979FF", // Bright blue for buttons and highlights
  background: "#000000", // True black background
  text: "#FFFFFF", // Pure white text
  border: "#1F1F1F", // Subtle border for cards/inputs
  white: "#FFFFFF",
  textLight: "#9E9E9E", // Dim gray for secondary text
  expense: "#FF5252", // Red for expense
  income: "#00E676", // Neon green for income
  card: "#121212", // Slightly lighter than background
  shadow: "#000000",
};
// constants/theme.js
const walletBlueTheme = {
  // Core brand colors
  primary: "#5A4FF3", // Button & accent blue-violet
  secondary: "#3D7BF6", // Light gradient blend color
  background: "#0F1C70", // Deep indigo-blue base
  gradient: ["#2E1EA7", "#4A39FF", "#007BFF"], // Background gradient
  text: "#FFFFFF", // Main text color
  textMuted: "#C5CAE9", // Lighter text / placeholders
  error: "#FF8A80", // Soft coral for errors
  card: "rgba(255,255,255,0.1)", // Input field background (translucent)
  border: "rgba(255,255,255,0.15)",
  white: "#FFFFFF",
  shadow: "#00000040",
};
const amberGoldTheme = {
  primary: "#FFD54F", // Gold yellow
  secondary: "#FFB300",
  background: "#1C1C1C",
  card: "#2C2C2C",
  text: "#FFFFFF",
  textLight: "#E0E0E0",
  border: "#3A3A3A",
  expense: "#E57373",
  income: "#81C784",
  white: "#FFFFFF",
  shadow: "#000000",
};

const royalBlueTheme = {
  primary: "#1565C0", // Royal blue (buttons, highlights)
  secondary: "#42A5F5", // Accent blue (charts, icons)
  background: "#0D1B2A", // Deep navy
  card: "#1B263B", // Card background
  text: "#FFFFFF", // Main text
  textLight: "#B0C4DE", // Secondary text
  border: "#1E3A5F",
  expense: "#E57373", // Coral red for outflow
  income: "#4DB6AC", // Mint green for inflow
  white: "#FFFFFF",
  shadow: "#00000080",
}; // constants/theme.js
const royalVioletTheme = {
  primary: "#6C63FF", // Main accent violet (button color)
  secondary: "#9575CD", // Lighter purple for highlights
  background: "#0E0B26", // Deep violet-black background
  gradient: ["#2E1EA7", "#4A39FF", "#007BFF"], // Signature blue-purple gradient
  card: "rgba(255, 255, 255, 0.08)", // Transparent card background
  text: "#FFFFFF", // White text
  textLight: "#BCAEF8", // Muted lavender text
  border: "rgba(255, 255, 255, 0.12)", // Soft border glow
  expense: "#FF8A80", // Coral red for expenses
  income: "#00E5FF", // Bright cyan for income
  white: "#FFFFFF",
  shadow: "#00000090",
  black: "#000000",
  dark: "#0f0f12ff",
  inputContainer: "#BCAEF8",
};

export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
  sunsetTheme: sunsetTheme,
  midnight: midnightTheme,
  mint: mintTheme,
  darkTheme: darkTheme,
  blackTheme: blackTheme,
  walletBlue: walletBlueTheme,
  royalBlue: royalBlueTheme,
  amberGold: amberGoldTheme,
  royalViolet: royalVioletTheme,
};

// 👇 change this to switch theme
export const COLORS = THEMES.royalViolet;
