import { Theme } from './settings/types';
import { V2SoftPastel } from './components/generated/V2SoftPastel';

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
      <V2SoftPastel />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
