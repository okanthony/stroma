import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { Plant, PlantType, CreatePlantInput } from '@/types/plant';
import { formatTitleCase } from '@/utils/formatTitleCase';
import { getDateAtNoon } from '@/utils/time-comparison';
import { subWeeks } from 'date-fns';

const initialPlant: Plant = {
  createdAt: '',
  id: '',
  lastWatered: 'January 1, 1970 08:00:00',
  name: '',
  room: '',
  type: PlantType.ZzPlant,
  notificationIds: [],
  areNotificationsEnabled: false
};

interface PlantState {
  plants: Record<string, Plant>;
  plantIds: string[];

  // Selectors
  getPlantById: (id: string) => Plant;
  getAllPlants: () => Plant[];

  // Actions
  addPlant: (plant: CreatePlantInput) => string; // Returns the generated UUID
  updatePlant: (id: string, updates: Partial<Omit<Plant, 'id'>>) => void;
  deletePlant: (id: string) => void;

  // Admin
  clearPlantsStore: () => void;
}

export const usePlantStore = create<PlantState>()(
  persist(
    (set, get) => ({
      plants: {},
      plantIds: [],

      // Selector: Get plant by ID
      getPlantById: (id) => get().plants[id] ?? initialPlant,

      // Selector: Get all plants as array
      getAllPlants: () => {
        const { plants, plantIds } = get();
        return plantIds.map((id) => plants[id]).filter(Boolean);
      },

      // Add plant - generates UUID and timestamp automatically
      addPlant: (plantData) => {
        const id = Crypto.randomUUID();

        set((state) => {
          // Generate default plant name in case user bails during "add plant" flow
          // Count existing plants of this type (excluding current plant)
          const existingPlantsOfType = Object.values(state.plants).filter((plant) => plant.type === plantData.type && plant.id !== id);
          // Next number is count + 1
          const nextNumber = existingPlantsOfType.length + 1;
          // Format: "Pothos 1", "Monstera 3", etc.
          const name = `${formatTitleCase(plantData.type)} ${nextNumber}`;

          // Set last watering data in case user bails during "add plant" flow
          const today = new Date();
          const lastWatered = getDateAtNoon(subWeeks(today, 6)).toISOString();

          // Build plant object
          const plant: Plant = {
            ...plantData, // currently only includes type when adding, so this could be removed if flow doesn't change
            type: plantData.type || PlantType.Pothos, // Provide default or validate
            name, // Default value
            lastWatered, // Default value
            id,
            notificationIds: [],
            areNotificationsEnabled: false, // Setting false as user could bail and not enter watering data, plus we want explicit permission
            createdAt: new Date().toISOString()
          };

          return {
            plants: {
              ...state.plants,
              [id]: plant
            },
            plantIds: [...state.plantIds, id]
          };
        });

        return id; // Return the generated UUID
      },

      // Update plant
      updatePlant: (id, updates) =>
        set((state) => {
          // Don't overwrite default name if empty value
          if (!updates.name) delete updates.name;
          return {
            plants: {
              ...state.plants,
              [id]: { ...state.plants[id], ...updates }
            }
          };
        }),

      // Delete plant
      deletePlant: (id) =>
        set((state) => ({
          plants: Object.fromEntries(Object.entries(state.plants).filter(([key]) => key !== id)),
          plantIds: state.plantIds.filter((plantId) => plantId !== id)
        })),

      // Delete all plants data
      clearPlantsStore: () => {
        set({
          plants: {},
          plantIds: []
        });
      }
    }),
    {
      name: 'stroma-store-plants',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
