import { Theme } from './settings/types';
import { V5DotGrid } from './components/generated/V5DotGrid';

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
      <V5DotGrid />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
