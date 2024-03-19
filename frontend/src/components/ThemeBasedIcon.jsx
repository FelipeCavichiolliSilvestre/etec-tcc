import { useThemeMode } from '../contexts/ThemeContext';

function ThemeBasedIcon({ darkIcon, lightIcon }) {
  const { isDarkMode } = useThemeMode();

  return <>{isDarkMode ? darkIcon : lightIcon}</>;
}

export default ThemeBasedIcon;
