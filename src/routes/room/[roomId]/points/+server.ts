import type { Room } from '$lib/models/room';
import type { RequestHandler } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { RoomUser } from '$lib/models/roomUser';
import { roomsTable, usersTable } from '$lib/database/schema';
import { db } from '$lib/database/client.server';
import { eq } from 'drizzle-orm';

export const PUT: RequestHandler = async ({ params, url }) => {
	
	const points: number = Number(url.searchParams.get('value'));
	const userId: string = url.searchParams.get("userId") as string;
	const roomId: string = params.roomId;
	
	console.log(`Updating user ${userId} points: ${points}, in room ${roomId}`)
	await db.update(usersTable).set({ pointSelection: points }).where(eq(usersTable.id, userId))
    return new Response();
};
