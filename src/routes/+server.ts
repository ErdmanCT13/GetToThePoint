import { redirect, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Room } from '$lib/models/room';
import type { RequestHandler } from './$types';
import type { RoomUser } from '$lib/models/roomUser';

export const GET: RequestHandler = async ({ url }) => {
	const supabase = createClient(
		'https://hbyhuxppgfoqfehxdxpl.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieWh1eHBwZ2ZvcWZlaHhkeHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MTU4NDIsImV4cCI6MjA0NDE5MTg0Mn0.9O3jp-kXonF7YxJHfmcCXEq-VbThUm9WoUuuycBzuJY'
	);

	let newRoom = crypto.randomUUID();

	//create a new room, since a room id wasn't provided
	const { error: insertRoomError } = await supabase
		.from('rooms')
		.insert<Room>({ id: newRoom, arePointsRevealed: false });

    console.log(insertRoomError)

	// if we fail to insert a room into the database, send the user back a 500 instead of rendering the room
	if (insertRoomError) throw error(500, 'unable to reach database');
	
    /*
        worth noting here, it's possible that a room could be created and the user could fail to be created.
        the solution to this would sending both queries as a transaction (i.e. if one component of the transaction fails, the entire thing is rolled back)
    */

    // now that all the db work is done, take the user to the new room with a redirect
	throw redirect(302, `/room/${newRoom}`);
}
