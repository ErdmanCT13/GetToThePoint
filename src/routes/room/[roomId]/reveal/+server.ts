import { redirect, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Room } from '$lib/models/room';
import type { RequestHandler } from '../../[[roomId]]/reveal/$types';
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
	console.log(value == "true", value)

	// update the database entry for the room so anyone joining the room will immediately see the point average if the room has been revealed
	await db.update(roomsTable).set({ arePointsRevealed: value == "true" }).where(eq(roomsTable.id, roomId));
	// now that all the db work is done, take the user to the new room with a redirect
	return new Response();
};
