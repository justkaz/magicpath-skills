const theme = 'light';

import { JulyCalendarWidget } from './components/generated/JulyCalendarWidget';

export default function App() {
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <JulyCalendarWidget />
    </div>
  );
}
