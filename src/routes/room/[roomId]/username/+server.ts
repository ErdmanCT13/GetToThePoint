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

	const userId: string = url.searchParams.get("userid") as string;
	const username: string = url.searchParams.get("username") as string;
	const roomId: string = params.roomId;
	
	console.log(`Updating user ${userId} username: ${username}, in room ${roomId}`)
	await db.update(usersTable).set({ displayName: username}).where(eq(usersTable.id, userId))
	return new Response();
};