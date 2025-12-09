import type { Plant } from '@/types/plant';
export interface PlantWithWateringInfo extends Plant {
  wateringCopy: {
    label: string;
    value: string;
  };
}
export type GroupedPlants = {
  today: (PlantWithWateringInfo & { isOverdue?: boolean })[];
  thisWeek: PlantWithWateringInfo[];
  nextWeek: PlantWithWateringInfo[];
  thisMonth: PlantWithWateringInfo[];
};
