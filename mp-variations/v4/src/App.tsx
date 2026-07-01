import { Theme } from './settings/types';
import { V4Editorial } from './components/generated/V4Editorial';

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
      <V4Editorial />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
