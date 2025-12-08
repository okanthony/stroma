import { ROOM_OPTIONS } from '@/constants/rooms';
import { formatTitleCase } from './formatTitleCase';

// Get formatted options for dropdown
export function getRoomDropdownOptions() {
  return ROOM_OPTIONS.map((room) => ({
    label: formatTitleCase(room),
    value: room
  }));
}
