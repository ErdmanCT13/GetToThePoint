import { writable } from 'svelte/store';
import { RoomUser } from './roomUsers';

let currentTestUser: RoomUser = {
	id: '5',
	name: 'current user',
	pointSelection: '1000'
};

export const currentRoomUser = writable<RoomUser>(currentTestUser);
