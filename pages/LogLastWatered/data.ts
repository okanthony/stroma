import { WateringTimeframe } from '@/utils/time-comparison';

export const TIMEFRAME_OPTIONS = [
  { label: 'Today', value: 'today' as WateringTimeframe },
  { label: 'This week', value: 'this-week' as WateringTimeframe },
  { label: 'Past two weeks', value: 'two-weeks' as WateringTimeframe },
  { label: 'Past month', value: 'four-weeks' as WateringTimeframe },
  { label: "I don't know", value: 'undetermined' as WateringTimeframe }
];

export type LogLastWateredProps = {
  initialTimeframe?: WateringTimeframe;
  onSubmit: (lastWatered: string) => void;
  submitButtonLabel?: string;
  title?: string;
  subtitle?: string;
};
