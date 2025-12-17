import { GroupedPlants } from '@/types/plant';

export const getPlantCategorySubheading = (groupedPlants: GroupedPlants): string | null => {
  const { today, thisWeek } = groupedPlants;

  // Check for overdue plants in today section
  const overduePlants = today.filter((plant) => plant.isOverdue);
  if (overduePlants.length > 0) {
    const count = overduePlants.length;
    return `You have ${count} ${count === 1 ? 'plant' : 'plants'} overdue for watering`;
  }

  // Check for plants to water today (not overdue)
  if (today.length > 0) {
    const count = today.length;
    return `You have ${count} ${count === 1 ? 'plant' : 'plants'} to water today`;
  }

  // Check for plants to water this week
  if (thisWeek.length > 0) {
    const count = thisWeek.length;
    return `You have ${count} ${count === 1 ? 'plant' : 'plants'} to water this week`;
  }

  // No upcoming watering needed
  return 'No plants to water this week';
};
