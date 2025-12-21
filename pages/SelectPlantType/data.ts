import { PlantType } from '@/types/plant';

// Types
export type SelectPlantTypeProps = {
  onSelectPlant: (plantType: PlantType) => void;
  title?: string;
  subtitle?: string;
  hideBackButton?: boolean;
};
export interface PLANT_DROPDOWN_ITEM {
  label: string;
  value: PlantType;
}

// Constants
export const PLANT_TYPE_DROPDOWN_DATA: PLANT_DROPDOWN_ITEM[] = [
  { label: 'Aloe Vera', value: PlantType.AloeVera },
  { label: 'Anthurium', value: PlantType.Anthurium },
  { label: 'Arrowhead Plant', value: PlantType.ArrowheadPlant },
  { label: 'Bird of Paradise', value: PlantType.BirdOfParadise },
  { label: 'Boston Fern', value: PlantType.BostonFern },
  { label: 'Cast Iron Plant', value: PlantType.CastIronPlant },
  { label: 'Chinese Evergreen', value: PlantType.ChineseEvergreen },
  { label: 'Croton', value: PlantType.Croton },
  { label: 'Dumb Cane', value: PlantType.DumbCane },
  { label: 'Dracaena', value: PlantType.Dracaena },
  { label: 'English Ivy', value: PlantType.EnglishIvy },
  { label: 'Fiddle Leaf Fig', value: PlantType.FiddleLeafFig },
  { label: 'Inch Plant', value: PlantType.InchPlant },
  { label: 'Jade Plant', value: PlantType.JadePlant },
  { label: 'Monstera', value: PlantType.Monstera },
  { label: 'Parlor Palm', value: PlantType.ParlorPalm },
  { label: 'Peace Lily', value: PlantType.PeaceLily },
  { label: 'Peperomia', value: PlantType.Peperomia },
  { label: 'Philodendron', value: PlantType.Philodendron },
  { label: 'Pothos', value: PlantType.Pothos },
  { label: 'Prayer Plant', value: PlantType.PrayerPlant },
  { label: 'Rubber Plant', value: PlantType.RubberPlant },
  { label: 'Snake Plant', value: PlantType.SnakePlant },
  { label: 'Spider Plant', value: PlantType.SpiderPlant },
  { label: 'String of Pearls', value: PlantType.StringOfPearls },
  { label: 'Succulent', value: PlantType.Succulent },
  { label: 'Umbrella Plant', value: PlantType.UmbrellaPlant },
  { label: 'Wax Plant', value: PlantType.WaxPlant },
  { label: 'ZZ Plant', value: PlantType.ZzPlant }
];
