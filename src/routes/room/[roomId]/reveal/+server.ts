import { redirect, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Room } from '$lib/models/room';
import type { RequestHandler } from './$types';
import type { RoomUser } from '$lib/models/roomUser';
import { roomsTable, usersTable } from '$lib/database/schema';
import { db } from '$lib/database/client.server';
import { eq } from 'drizzle-orm';
import serviceClient from '$lib/pubSub/pubSubServiceClient';

export const PUT: RequestHandler = async ({ params, url }) => {

	const value: string = url.searchParams.get('value') as string;
	const roomId: string = params.roomId;
	
	//console.log(`Updating user ${userId} points: ${points}, in room ${roomId}`)
	console.log("Revealing points for room: ", roomId)

	// update the database entry for the room so anyone joining the room will immediately see the point average if the room has been revealed
	db.update(roomsTable).set({ arePointsRevealed: Boolean(value) }).where(eq(roomsTable.id, params.roomId));
	// now that all the db work is done, take the user to the new room with a redirect
	return new Response();
};
