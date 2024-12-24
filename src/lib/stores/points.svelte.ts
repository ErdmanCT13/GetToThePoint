// stores state related to points
// i.e. are the points visible

import { derived, writable } from 'svelte/store';
import { remoteUsers } from './users.svelte';

export const arePointsVisible = $state({value: false});

// this will bind to the point selector component's value
export const pointsValueString = $state({value: "0"})
