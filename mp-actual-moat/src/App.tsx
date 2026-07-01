import { Theme } from './settings/types';
import { ActualAggregatorMoat } from './components/generated/ActualAggregatorMoat';

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
      <ActualAggregatorMoat />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
