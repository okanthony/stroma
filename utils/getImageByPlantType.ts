import { PLANT_IMAGES_BY_TYPE } from '@/constants/plant-data';
import { PlantType } from '@/types/plant';

/**
 * Get the image for a plant type
 * @param type - The plant type enum
 * @returns Image source for require()
 */
export function getImageByPlantType(type: PlantType) {
  return PLANT_IMAGES_BY_TYPE[type];
}
