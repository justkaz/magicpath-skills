import { Theme } from './settings/types';
import { ActualPitchDeck } from './components/generated/ActualPitchDeck';

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
      <ActualPitchDeck />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
