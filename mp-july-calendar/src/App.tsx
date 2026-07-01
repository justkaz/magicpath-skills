import { Theme } from './settings/types';
import { July2026FamilyCalendar } from './components/generated/July2026FamilyCalendar';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <>
      <July2026FamilyCalendar />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;