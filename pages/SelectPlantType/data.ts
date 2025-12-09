import { PlantType } from '@/types/plant';

// Types
export type SelectPlantTypeProps = {
  onSelectPlant: (plantType: PlantType) => void;
  title?: string;
  subtitle?: string;
  hideBackButton?: boolean;
};

// Constants
export const PLANT_LIST_DATA = [
  { label: 'Aloe Vera', value: PlantType.AloeVera },
  { label: 'Boston Fern', value: PlantType.BostonFern },
  { label: 'Chinese Evergreen', value: PlantType.ChineseEvergreen },
  { label: 'Dracaena', value: PlantType.Dracaena },
  { label: 'English Ivy', value: PlantType.EnglishIvy },
  { label: 'Fiddle Leaf Fig', value: PlantType.FiddleLeafFig },
  { label: 'Jade Plant', value: PlantType.JadePlant },
  { label: 'Monstera', value: PlantType.Monstera },
  { label: 'Peace Lily', value: PlantType.PeaceLily },
  { label: 'Philodendron', value: PlantType.Philodendron },
  { label: 'Pothos', value: PlantType.Pothos },
  { label: 'Rubber Plant', value: PlantType.RubberPlant },
  { label: 'Snake Plant', value: PlantType.SnakePlant },
  { label: 'Spider Plant', value: PlantType.SpiderPlant },
  { label: 'ZZ Plant', value: PlantType.ZzPlant }
];
