import { Theme } from './settings/types';
import { M5Timeline } from './components/generated/M5Timeline';

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
      <M5Timeline />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;