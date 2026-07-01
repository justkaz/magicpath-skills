import { Theme } from './settings/types';
import { ActualPitch } from './components/generated/ActualPitch';

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
      <ActualPitch />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
