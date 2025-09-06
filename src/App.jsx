import { ThemeProvider, useTheme } from "./context/ThemeContext";
import TaskManager from "./components/TaskManager";
import "./index.css";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <ThemeSwitcher />
        <TaskManager />
      </div>
    </ThemeProvider>
  );
}
