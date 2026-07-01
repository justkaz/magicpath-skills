import { Theme } from './settings/types';
import { M3BottomSheet } from './components/generated/M3BottomSheet';

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
      <M3BottomSheet />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
