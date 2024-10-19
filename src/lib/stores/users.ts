import { derived, writable } from 'svelte/store';
import { RoomUser } from '$lib/models/roomUser';
import { createClient } from '@supabase/supabase-js';

let remoteTestUsers: RoomUser[] = [
	{
		id: '2',
		name: 'Brian',
		pointSelection: '1'
	},
	{
		id: '3',
		name: 'Jeb',
		pointSelection: '5'
	},
	{
		id: '4',
		name: 'Tyler',
		pointSelection: '5'
	},
	{
		id: '5',
		name: 'Tom',
		pointSelection: '5'
	},
	{
		id: '5',
		name: 'Tom',
		pointSelection: '5'
	}
];

let currentTestUser: RoomUser = {
	id: '5',
	name: 'current user',
	pointSelection: '1000'
};

const supabase = createClient(
	'https://hbyhuxppgfoqfehxdxpl.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieWh1eHBwZ2ZvcWZlaHhkeHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MTU4NDIsImV4cCI6MjA0NDE5MTg0Mn0.9O3jp-kXonF7YxJHfmcCXEq-VbThUm9WoUuuycBzuJY'
);

class SupabaseRealtimeDbInsert {
	new: RoomUser = new RoomUser();
}

export const remoteUsers = writable<RoomUser[]>([]);
export const clientUser = writable<RoomUser>(currentTestUser);
export const allUsers = derived(
	[remoteUsers, clientUser],
	([$remoteUsers, $clientUser]) => {
		return [$clientUser, ...$remoteUsers];
	},
	[currentTestUser].filter((user) => user.pointSelection)
    //[currentTestUser, ...remoteTestUsers].filter((user) => user.pointSelection)
);

// Listen to inserts
supabase
	.channel('users')
	.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, (payload: SupabaseRealtimeDbInsert) => {
        console.log(payload.new)
        remoteUsers.update((remoteUsers) => [...remoteUsers, payload.new])
    })
	.subscribe();
