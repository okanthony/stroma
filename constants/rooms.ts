export const ROOM_OPTIONS = ['living-room', 'bedroom', 'kitchen', 'dining-room', 'entryway', 'bathroom', 'home-office', 'sun-room', 'patio', 'balcony', 'other'] as const;

export type Room = (typeof ROOM_OPTIONS)[number];
