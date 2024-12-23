import { redirect, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Room } from '$lib/models/room';
import type { RequestHandler } from './$types';
import { roomsTable, usersTable } from '$lib/database/schema';
import { db } from '$lib/database/client.server';
import { eq } from 'drizzle-orm';

export const PUT: RequestHandler = async ({ params, url }) => {

	const value: string = url.searchParams.get('value') as string;
	const roomId: string = params.roomId;
	
	//console.log(`Updating user ${userId} points: ${points}, in room ${roomId}`)
	console.log("resetting points for room: ", roomId)

	// update the database entry for the room so anyone joining the room will immediately see the point average if the room has been revealed
	db.update(usersTable).set({ pointSelection: 0 }).where(eq(usersTable.roomId, params.roomId));
	// now that all the db work is done, take the user to the new room with a redirect
	return new Response();
};
