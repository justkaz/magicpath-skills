import { Theme } from './settings/types';
import { M4SwipeCards } from './components/generated/M4SwipeCards';

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
      <M4SwipeCards />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
