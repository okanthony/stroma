/**
 * Formats room names for UI display by converting hyphens to spaces
 * and title casing each word.
 *
 * @param room - Raw room name (e.g., 'living-room', 'kitchen')
 * @returns Formatted room name (e.g., 'Living Room', 'Kitchen')
 *
 * @example
 * formatTitleCase('kitchen') // 'Kitchen'
 * formatTitleCase('living-room') // 'Living Room'
 * formatTitleCase('master-bedroom') // 'Master Bedroom'
 * formatTitleCase('') // ''
 * formatTitleCase(undefined) // ''
 */
export function formatTitleCase(room: string | undefined): string {
  if (!room) {
    return '';
  }

  return room
    .split('-') // Split on hyphens: ['living', 'room']
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Title case each word: ['Living', 'Room']
    .join(' '); // Join with spaces: 'Living Room'
}
