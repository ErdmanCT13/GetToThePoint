// stores state related to points
// i.e. are the points visible

import { derived, writable } from 'svelte/store';
import { remoteUsers } from './users';

// function add(accumulator: any, value: string|undefined|null) {
//     console.log(value)
//     return accumulator + Number(value);
//   }

export const arePointsVisible = writable<boolean>(false);

// export const pointsAverage = derived(roomUsers, ($roomUsers, set) => {
//     const sum = $roomUsers.map(user => user.pointSelection).reduce(add, 0); // with initial value to avoid when the array is empty
//     set(sum);
// })
