<script lang="ts">
	//import { ConsoleLogWriter } from 'drizzle-orm';
	import type { PageData } from './$types';
	import type { RoomEvent } from '$lib/models/roomEvent';
	import { WebPubSubClient } from '@azure/web-pubsub-client';
	import { browser } from '$app/environment';
	import PointSelector from '$lib/components/pointSelector.svelte';
	import UserStatus from '$lib/components/userStatus.svelte';
	import { allUsers, remoteUsers } from '$lib/stores/users';
	import { clientUser } from '$lib/stores/users';
	import { Button } from 'bits-ui';
	import { arePointsVisible } from '$lib/stores/points';
	import { HandleRoomMessage } from '$lib/pubSub/eventHandlers';
	import { SetupRoomListener as RoomListenerSetup } from '$lib/pubSub/pubSubClient';
	import { getUserIfCached } from '$lib/helpers/localUserCache';
	import type { RoomUser } from '$lib/models/roomUser';

	export let data: PageData;

	let roomClient: WebPubSubClient;

	if (browser) {

		// todo: implement display name save and broadcast
		// to make the user's life a little easier, when they save a name, we'll cach their user state and try to reuse whatever name was saved
		const cachedUser: RoomUser | null = getUserIfCached();
		let nameToDisplay: string = data.serverGeneratedDisplayName;
		if(cachedUser)
			nameToDisplay = cachedUser.displayName;
		else
			nameToDisplay = data.serverGeneratedDisplayName
		
		$clientUser.displayName = nameToDisplay

		// note that Vite has issues with this package. Apparently Vite only targets browsers, and therefore cannot make use of NodeJS core modules
		// the 'events' module is one such much and is used by WebPubSubClient.
		// fix was to install the 'events' module as a dependency

		// create and set up a web pub sub client to listen to the room and handle events
		roomClient = RoomListenerSetup(data.clientAccessUri, data.newRoomUserId);

		roomClient.sendToGroup(
			data.roomId,
			JSON.stringify({
				time: Date.now().toString(),
				roomEvent: 'join',
				userId: data.newRoomUserId,
				roomId: data.roomId,
				userDisplayName: nameToDisplay
			} as RoomEvent<undefined>),
			'text'
		);
	}

	function add(accumulator: number, value: number) {
		return accumulator + value;
	}

	function toggleArePointsVisible() {
		const newValue = !$arePointsVisible; // invert the current value
		fetch(`/room/${data.roomId}/reveal?value=${newValue}`, { // send a request to the server to update the db
			method: 'PUT'
		});

		roomClient.sendToGroup(
			data.roomId,
			JSON.stringify({
				time: Date.now().toString(),
				roomEvent: 'reveal',
				userId: data.newRoomUserId,
				roomId: data.roomId,
				value: newValue,
				userDisplayName: `User ${data.newRoomUserId}`
			} as RoomEvent<boolean>),
			'text'
		);

		$arePointsVisible = newValue;
		console.log($arePointsVisible)
	}

	function updatePointSelection(value: string | undefined) {
		const newValue: number = value ? Number(value) : 0;
		fetch(`/room/${data.roomId}/points?value=${newValue}&userId=${data.newRoomUserId}`, {
			method: 'PUT'
		});

		roomClient.sendToGroup(
			data.roomId,
			JSON.stringify({
				time: Date.now().toString(),
				roomEvent: 'point',
				userId: data.newRoomUserId,
				roomId: data.roomId,
				value: newValue,
				userDisplayName: `User ${data.newRoomUserId}`
			} as RoomEvent<number>),
			'text'
		);

		$clientUser.pointSelection = Number(value);
	}

	$arePointsVisible = data.arePointsRevealed;
	$remoteUsers = data.existingRoomUsers; // update state with the users that were already in the room before client joined

	$: usersWithPointSelected = $allUsers.filter((user) => user.pointSelection); // filter out the falsy values
	$: averagePoints =
		usersWithPointSelected.map((user) => user.pointSelection).reduce(add, 0) /
		usersWithPointSelected.length; // with initial value to avoid when the array is empty
	$: roomPointsDisplayValue = $arePointsVisible ? averagePoints : 'hidden';
</script>

<!-- this will be the starting point for next time. exposing the user id like this means we can update the db -->
<!-- <div>{data.newRoomUserId} ///// {data.roomId} ////// {data.clientAccessUri}</div> -->

<!-- content -->
<div class="h-screen w-screen bg-black flex flex-col justify-center items-center">
	<!-- center center -->
	<div class="content h-full w-[25%] bg-black flex flex-col justify-center items-center space-y-[10px]">

		<!-- nav -->
		<div class="w-full">
			<div class="flex spacing-x-[10px] border-[1px] border-white border-solid">
				<input bind:value={$clientUser.displayName} placeholder="Enter name..." class=
				"text-white bg-black h-[50px] p-[10px] flex-1" 
				/>
				<button class="text-black bg-white p-[10px]">save</button>
			</div>
		</div>
	
		<!-- reveal -->
		<div class="bg-white p-[10px] w-full flex justify-between">
			<span>{roomPointsDisplayValue}</span>
			<button
				on:click={toggleArePointsVisible}
				class="
				bg-orange-500
			
			">reveal</button
			>
		</div>
	
		<!-- point selection -->
		<div class="point-selection w-full">
			<PointSelector onPointSelection={updatePointSelection}></PointSelector>
		</div>
	
		<!-- user statuses -->
		<div class="w-full grid grid-cols-2 gap-3">
			<!-- current user should always appear at the front, user'displayName always be visible -->
			<UserStatus pointsRevealed={true} roomUser={$clientUser}></UserStatus>
			<!-- display all other users after current user -->
			{#each $remoteUsers as user}
				<UserStatus pointsRevealed={$arePointsVisible} roomUser={user}></UserStatus>
			{/each}
		</div>
	</div>
</div>

