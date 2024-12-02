import { redirect, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Room } from '$lib/models/room';
import type { RequestHandler } from './$types';
import type { RoomUser } from '$lib/models/roomUser';
import { roomsTable } from '$lib/database/schema';
import { db } from '$lib/database/client.server';

// when the user visits the base URL, we should generate a new room for them to join, and then redirect them to that room
// once redirected, the path /room/[roomId] will insert a new user in that room, and publish a notification to other clients that a new user has joined

export const GET: RequestHandler = async ({ url }) => {
	
	let newRoom = crypto.randomUUID();

	const room: Room = {
		id: newRoom,
		arePointsRevealed: false,
		creationDate: new Date()
	};

	await db.insert(roomsTable).values(room); // these queries should be batched at some point, although really since this db is embedded that's probably less of a concern

	// now that all the db work is done, take the user to the new room with a redirect
	throw redirect(302, `/room/${newRoom}`);
};
