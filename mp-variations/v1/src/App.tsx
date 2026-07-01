import { Theme } from './settings/types';
import { V1MinimalMono } from './components/generated/V1MinimalMono';

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
      <V1MinimalMono />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
