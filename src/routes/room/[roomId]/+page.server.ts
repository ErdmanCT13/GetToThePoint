import { error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import type { RoomUser } from '$lib/models/roomUser';

export const load: PageServerLoad = async ({ params }) => {

	const supabase = createClient(
		'https://hbyhuxppgfoqfehxdxpl.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieWh1eHBwZ2ZvcWZlaHhkeHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MTU4NDIsImV4cCI6MjA0NDE5MTg0Mn0.9O3jp-kXonF7YxJHfmcCXEq-VbThUm9WoUuuycBzuJY'
	);

    let newRoomUserId: string = crypto.randomUUID();

	// assuming we haven't already sent back a 500 in response to some other issue, we should also insert the current user into this new room
	const { error: insertRoomUserError } = await supabase
		.from('users')
		.insert<RoomUser>({
			id: newRoomUserId, // create a new UUID since this is a new user
			roomId: params.roomId,
			name: 'TestUser',
			pointSelection: null
		});

	// if we experience an error while trying to insert a user *into* our room, we should also return a 500
	if (insertRoomUserError) throw error(500, 'unable to reach database');

    return {newRoomUserId}
};
