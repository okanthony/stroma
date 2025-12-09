// types/plant.ts
export interface Plant {
  id: string;
  name: string;
  room?: string;
  createdAt: string;
  type: PlantType;
  // Add other fields as you build out the app:
  // species?: string;
  // wateringFrequency?: number;
  lastWatered?: string;
  notificationIds: string[]; // Array of notification IDs for this plant
  areNotificationsEnabled: boolean;
  // imageUrl?: string;
  // notes?: string;
}

export type CreatePlantInput = {
  type?: PlantType;
};

export enum PlantType {
  Pothos = 'pothos',
  Monstera = 'monstera',
  SpiderPlant = 'spider-plant',
  SnakePlant = 'snake-plant',
  RubberPlant = 'rubber-plant',
  PeaceLily = 'peace-lily',
  ZzPlant = 'zz-plant',
  Philodendron = 'philodendron',
  Dracaena = 'dracaena',
  AloeVera = 'aloe-vera',
  FiddleLeafFig = 'fiddle-leaf-fig',
  ChineseEvergreen = 'chinese-evergreen',
  BostonFern = 'boston-fern',
  JadePlant = 'jade-plant',
  EnglishIvy = 'english-ivy'
}

export interface PlantWateringDataEntry {
  wateringRange: {
    inSeason: {
      minimum: number;
      maximum: number;
    };
    outOfSeason: {
      minimum: number;
      maximum: number;
    };
  };
  fertilizeRange: {
    inSeason: {
      minimum: number;
      maximum: number;
    };
    outOfSeason: {
      minimum: number;
      maximum: number;
    };
  };
}
