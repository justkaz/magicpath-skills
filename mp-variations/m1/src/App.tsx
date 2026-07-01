import { Theme } from './settings/types';
import { M1AgendaList } from './components/generated/M1AgendaList';

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
      <M1AgendaList />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
