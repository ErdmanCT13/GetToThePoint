import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RoomUser } from '$lib/models/roomUser';
import type { Room } from '$lib/models/room';
import serviceClient from "$lib/pubSub/pubSubServiceClient"
import { db } from '$lib/database/client.server';
import { roomsTable, usersTable } from '$lib/database/schema';
import { eq } from 'drizzle-orm';
//import { db} from '$lib/database/client';

// in this file, we should use the provided room id to insert a new user in that room, and then notify the other clients of this user joining

export const load: PageServerLoad = async ({ params }) => {

    const newRoomUserId: string = crypto.randomUUID();
	const roomId: string = params.roomId;
	const userDisplayName = `User ${newRoomUserId}`;

	const user: RoomUser = {
		id: newRoomUserId,
		roomId,
		pointSelection: 0,
		displayName: userDisplayName
	}

	const existingRoomUsers: RoomUser[] = await db.select().from(usersTable).where(eq(usersTable.roomId, roomId)); // before inserting a new user, load the old ones to display
	const room: Room = (await db.select().from(roomsTable).where(eq(roomsTable.id, roomId)))[0];// there shold only ever be one room with this id, if not we have bigger issues
	const arePointsRevealed = room.arePointsRevealed;
	await db.insert(usersTable).values(user);
	
	// this client is intended to be used on the server only, primarily for the purpose of setting auth token permissions and generating URLs for the client to use when connecting to pub sub
	const clientAccessToken = await serviceClient.getClientAccessToken({
		roles: [`webpubsub.sendToGroup.${roomId}`], // allows user to publish messages to their room, and only their room
		userId: newRoomUserId, // attach a user id so the client doesn't have to specify one after connecting
		groups: [roomId], // same here with the group, this is so the client won't have to join one explicitly
	})
	// const roomGroupClient = serviceClient.group(roomId)

	const clientAccessUri = clientAccessToken.url;

    return {roomId, newRoomUserId, userDisplayName, clientAccessUri, existingRoomUsers, arePointsRevealed};
};