import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import App from "./App.tsx";

// Modern, sleek theme with space/sci-fi aesthetics
const theme = createTheme({
  primaryColor: "violet",
  fontFamily: "system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: "700",
  },
  colors: {
    violet: [
      "#f3f0ff",
      "#e5dbff",
      "#d0bfff",
      "#b197fc",
      "#9775fa",
      "#845ef7",
      "#7950f2",
      "#7048e8",
      "#6741d9",
      "#5f3dc4",
    ],
  },
  defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
