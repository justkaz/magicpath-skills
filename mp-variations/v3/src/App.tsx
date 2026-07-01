import { Theme } from './settings/types';
import { V3Brutalist } from './components/generated/V3Brutalist';

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
      <V3Brutalist />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
