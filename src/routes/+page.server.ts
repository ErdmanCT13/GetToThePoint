import type { Actions } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Room } from '$lib/models/room';
import type { RoomUser } from '$lib/models/roomUser';
import { roomsTable } from '$lib/database/schema';
import { db } from '$lib/database/client.server';

export const actions = {
	default: async ({ request, params, url }) => {
		const data = await request.formData();
		const roomReferral: string | null = url.searchParams.get("username");
		const username = data.get("username")

		// this is here to allow rooms to refer a user to the 'enter name' page.
		// for example, if a user copies navigates to a room link, they won't 
		if(roomReferral){
			redirect(302, `/room/${roomReferral}?username=${username}`);
		}

		let newRoom = crypto.randomUUID();

		const room: Room = {
			id: newRoom,
			arePointsRevealed: false,
			creationDate: new Date()
		};

		await db.insert(roomsTable).values(room); // these queries should be batched at some point, although really since this db is embedded that's probably less of a concern

		// now that all the db work is done, take the user to the new room with a redirect
		throw redirect(302, `/room/${newRoom}?username=${username}`);
	}
} satisfies Actions;
