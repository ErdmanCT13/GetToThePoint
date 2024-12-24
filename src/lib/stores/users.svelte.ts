import { derived, writable } from 'svelte/store';
import type { RoomUser } from '$lib/models/roomUser';

// let remoteTestUsers: RoomUser[] = [
// 	{
// 		id: '2',
// 		displayName: 'Brian',
// 		roomId: "100",
// 		pointSelection: 1
// 	},
// 	{
// 		id: '3',
// 		displayName: 'Jeb',
// 		roomId: "100",
// 		pointSelection: 5
// 	},
// 	{
// 		id: '4',
// 		displayName: 'Tyler',
// 		roomId: "100",
// 		pointSelection: 5
// 	},
// 	{
// 		id: '5',
// 		displayName: 'Tom',
// 		roomId: "100",
// 		pointSelection: 5
// 	},
// 	{
// 		id: '5',
// 		displayName: 'Tom',
// 		roomId: "100",
// 		pointSelection: 5
// 	}
// ];

let currentTestUser: RoomUser = {
	id: '',
	displayName: '',
	roomId: '',
	pointSelection: 0
};

//export const remoteUsers = writable<RoomUser[]>([]);
export const remoteUsers = $state<{value: RoomUser[]}>({value: []});
export const clientUser = $state({value: currentTestUser});
// export const allUsers = derived( // this is probably redundant... // TODO: consider moving away from allUsers derived store
// 	[remoteUsers, clientUser],
// 	([$remoteUsers, $clientUser]) => {
// 		return [$clientUser, ...$remoteUsers];
// 	},
// 	[currentTestUser].filter((user) => user.pointSelection)
//     //[currentTestUser, ...remoteTestUsers].filter((user) => user.pointSelection)
// );

const allUsers = $derived([
	clientUser.value,
	...remoteUsers.value
])

export function getAllUsers(){
	return allUsers
}


