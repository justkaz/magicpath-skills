import { Theme } from './settings/types';
import { M2WeekStrip } from './components/generated/M2WeekStrip';

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
      <M2WeekStrip />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
