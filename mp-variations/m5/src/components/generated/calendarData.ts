export type PersonFilter = 'all' | 'JK' | 'CK';

export type EventOwner = 'JK' | 'CK' | 'both' | 'neutral';

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  owner: EventOwner;
  time?: string;
  spanId?: string;
  spanLabel?: string;
}

export interface CalendarDay {
  date: string;
  day: number;
  inMonth: 'june' | 'july' | 'august';
  isToday?: boolean;
}

export const MONTH_LABEL = 'July';
export const YEAR = 2026;

export const EVENTS: CalendarEvent[] = [
{ id: 'e1', date: '2026-06-28', title: 'CK', owner: 'CK' },
{ id: 'e2', date: '2026-06-29', title: 'Camp Cahito', owner: 'JK' },
{ id: 'e3', date: '2026-06-30', title: 'Splashball', owner: 'JK', time: '5:45' },
{ id: 'e4', date: '2026-07-01', title: 'JK', owner: 'JK' },
{ id: 'e5', date: '2026-07-02', title: 'Splashball', owner: 'CK', time: '5:45' },
{ id: 'e6', date: '2026-07-03', title: 'CK', owner: 'CK' },
{ id: 'e7', date: '2026-07-04', title: 'JK', owner: 'JK' },
{ id: 'e8', date: '2026-07-05', title: 'Danya bday', owner: 'JK', time: '3 pm' },
{ id: 'e9', date: '2026-07-06', title: 'No Camp', owner: 'JK' },
{
  id: 'e10',
  date: '2026-07-07',
  title: 'B-ball 4:30 · Splashball 5:45',
  owner: 'JK'
},
{
  id: 'e11',
  date: '2026-07-08',
  title: 'Big Sur',
  owner: 'CK',
  spanId: 'big-sur',
  spanLabel: 'Big Sur Trip'
},
{ id: 'e12', date: '2026-07-09', title: 'CK', owner: 'CK', spanId: 'big-sur' },
{ id: 'e13', date: '2026-07-10', title: 'CK', owner: 'CK', spanId: 'big-sur' },
{ id: 'e14', date: '2026-07-11', title: 'CK', owner: 'CK', spanId: 'big-sur' },
{ id: 'e15', date: '2026-07-12', title: 'JK', owner: 'JK' },
{
  id: 'e16',
  date: '2026-07-13',
  title: 'Surf Camp · Tutor',
  owner: 'JK',
  time: '4 pm'
},
{
  id: 'e17',
  date: '2026-07-14',
  title: 'B-ball 4:30 · Splashball 5:45',
  owner: 'CK'
},
{ id: 'e18', date: '2026-07-15', title: 'Tutor', owner: 'CK', time: '4 pm' },
{ id: 'e19', date: '2026-07-16', title: 'Splashball', owner: 'CK', time: '5:45' },
{ id: 'e20', date: '2026-07-17', title: 'JK', owner: 'JK' },
{
  id: 'e21',
  date: '2026-07-18',
  title: 'B-ball Game',
  owner: 'JK',
  time: '10:15–11'
},
{ id: 'e22', date: '2026-07-19', title: 'JK', owner: 'JK' },
{ id: 'e23', date: '2026-07-20', title: 'Camp Cahito', owner: 'CK' },
{
  id: 'e24',
  date: '2026-07-21',
  title: 'B-ball 4:30 · Splashball 5:45',
  owner: 'CK'
},
{ id: 'e25', date: '2026-07-22', title: 'JK', owner: 'JK' },
{ id: 'e26', date: '2026-07-23', title: 'Splashball', owner: 'JK', time: '5:45' },
{ id: 'e27', date: '2026-07-24', title: 'CK', owner: 'CK' },
{
  id: 'e28',
  date: '2026-07-25',
  title: 'B-ball Game 10:15 · CK Work LA',
  owner: 'both'
},
{ id: 'e29', date: '2026-07-26', title: 'CK', owner: 'CK' },
{
  id: 'e30',
  date: '2026-07-27',
  title: 'Fleet Science · Tutor',
  owner: 'JK',
  time: '4:30'
},
{ id: 'e31', date: '2026-07-28', title: 'B-ball 4:30', owner: 'JK' },
{ id: 'e32', date: '2026-07-29', title: 'JK', owner: 'JK' },
{ id: 'e33', date: '2026-07-30', title: 'Tutor', owner: 'CK', time: '4:30' },
{ id: 'e34', date: '2026-07-31', title: 'CK', owner: 'CK' },
{
  id: 'e35',
  date: '2026-08-01',
  title: 'B-ball Game',
  owner: 'neutral',
  time: '10:15'
}];


export const SPANS: Record<
  string,
  {label: string;start: string;end: string;owner: EventOwner;}> =
{
  'big-sur': {
    label: 'Big Sur Trip',
    start: '2026-07-08',
    end: '2026-07-11',
    owner: 'CK'
  }
};

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export function buildCalendarGrid(): CalendarDay[][] {
  const days: CalendarDay[] = [
  { date: '2026-06-28', day: 28, inMonth: 'june' },
  { date: '2026-06-29', day: 29, inMonth: 'june' },
  { date: '2026-06-30', day: 30, inMonth: 'june' },
  ...Array.from({ length: 31 }, (_, i) => ({
    date: `2026-07-${String(i + 1).padStart(2, '0')}`,
    day: i + 1,
    inMonth: 'july' as const
  })),
  { date: '2026-08-01', day: 1, inMonth: 'august' }];


  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function eventsForDate(date: string, filter: PersonFilter): CalendarEvent[] {
  return EVENTS.filter((event) => {
    if (event.date !== date) return false;
    if (filter === 'all') return true;
    if (filter === 'JK') return event.owner === 'JK' || event.owner === 'both';
    return event.owner === 'CK' || event.owner === 'both';
  });
}

export function ownerMatchesFilter(owner: EventOwner, filter: PersonFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'JK') return owner === 'JK' || owner === 'both';
  return owner === 'CK' || owner === 'both';
}

export function formatDisplayDate(date: string): string {
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}