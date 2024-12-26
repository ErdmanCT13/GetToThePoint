<script lang="ts">
	//import { ConsoleLogWriter } from 'drizzle-orm';
	import type { PageData } from './$types';
	import type { RoomEvent } from '$lib/models/roomEvent';
	import { WebPubSubClient } from '@azure/web-pubsub-client';
	import { browser } from '$app/environment';
	import PointSelector from '$lib/components/pointSelector.svelte';
	import UserStatus from '$lib/components/userStatus.svelte';
	import { Separator } from 'bits-ui';
	import { getAllUsers, remoteUsers } from '$lib/stores/users.svelte';
	import { clientUser } from '$lib/stores/users.svelte';
	import { Button } from 'bits-ui';
	import { arePointsVisible, pointsValueString } from '$lib/stores/points.svelte';
	import { HandleRoomMessage } from '$lib/pubSub/eventHandlers';
	import { SetupRoomListener as RoomListenerSetup } from '$lib/pubSub/pubSubClient';
	import { getUserIfCached } from '$lib/helpers/localUserCache';
	import type { RoomUser } from '$lib/models/roomUser';
	import { get } from 'svelte/store';
	import { ConsoleLogWriter } from 'drizzle-orm';
	import { randomQuip } from '$lib/helpers/quips';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let roomClient: WebPubSubClient;
	let nameToDisplay: string = data.serverGeneratedDisplayName;

	if (browser) {
		// todo: implement display name save and broadcast
		// to make the user's life a little easier, when they save a name, we'll cach their user state and try to reuse whatever name was saved
		const cachedUser: RoomUser | null = getUserIfCached();

		if (cachedUser) nameToDisplay = cachedUser.displayName;
		else nameToDisplay = data.serverGeneratedDisplayName;
		clientUser.value.displayName = nameToDisplay;

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
		const newValue = !arePointsVisible.value; // invert the current value
		fetch(`/room/${data.roomId}/reveal?value=${newValue}`, {
			// send a request to the server to update the db
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
				userDisplayName: nameToDisplay
			} as RoomEvent<boolean>),
			'text'
		);

		arePointsVisible.value = newValue;
		console.log(arePointsVisible);
	}

	function resetRoomPoints() {
		fetch(`/room/${data.roomId}/reset`, {
			// send a request to the server to update the db
			method: 'PUT'
		});

		roomClient.sendToGroup(
			data.roomId,
			JSON.stringify({
				time: Date.now().toString(),
				roomEvent: 'reset',
				userId: data.newRoomUserId,
				roomId: data.roomId,
				userDisplayName: nameToDisplay
			} as RoomEvent),
			'text'
		);

		// reset all users points
		clientUser.value.pointSelection = 0;
		// reset the user input and hide points
		arePointsVisible.value = false;
		pointsValueString.value = '0';
		remoteUsers.value = remoteUsers.value.map<RoomUser>((remoteUser) => ({
			...remoteUser,
			pointSelection: 0
		}));
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
				userDisplayName: nameToDisplay
			} as RoomEvent<number>),
			'text'
		);

		clientUser.value.pointSelection = Number(value);
	}

	arePointsVisible.value = data.arePointsRevealed;
	remoteUsers.value = data.existingRoomUsers; // update state with the users that were already in the room before client joined

	let usersWithPointSelected = $derived(getAllUsers().filter((user) => user.pointSelection)); // filter out the falsy values
	let averagePoints = $derived(
		usersWithPointSelected.map((user) => user.pointSelection).reduce(add, 0) / usersWithPointSelected.length
	); // with initial value to avoid when the array is empty
	let roomPointsDisplayValue = $derived(usersWithPointSelected.length > 0 ? averagePoints : null);
	let cheekyQuip = $derived(arePointsVisible.value ? randomQuip() : null)
	// group the users by their point selection, sort them from largest to smallest
	let pointsTally = $derived(
		[...Map.groupBy(getAllUsers(), (user) => user.pointSelection)].sort((a, b) => {
			let [, valueA] = a;
			let [, valueB] = b;
			return valueB.length - valueA.length;
		})
	);
</script>

<!-- this will be the starting point for next time. exposing the user id like this means we can update the db -->
<!-- <div>{data.newRoomUserId} ///// {data.roomId} ////// {data.clientAccessUri}</div> -->

<!-- content -->
<div class="h-screen w-screen bg-black flex flex-col justify-center items-center">

	
	<!-- center center -->
	<div class="content h-full w-[25%] flex flex-col justify-center items-center space-y-[20px]">

		<div class="w-full flex space-x-[10px]">
			<button
				onclick={toggleArePointsVisible}
				class="
					h-[50px] w-full
				 	px-[20px] 
					font-bold
					{arePointsVisible.value ? "text-black bg-[#F8F32B] hover:bg-main-dark hover:text-white" :"bg-main-light text-white hover:bg-main-dark hover:text-white"}
					rounded-full 
					flex 
					justify-start 
					items-center"
			>
				{arePointsVisible.value ? 'Hide' : 'Reveal'}
			</button>

			<button
				onclick={resetRoomPoints}
				class="h-[50px] w-full px-[20px] bg-main-light hover:bg-white text-white hover:text-black font-bold border-main-light border-[1px] rounded-full flex justify-start items-center"
			>
				Reset
			</button>
		</div>

		<Separator.Root
			class="shrink-0 bg-main-dark data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[2px]"
		/>
		
		<!-- top content -->
		<div class="flex flex-col space-y-[10px] w-full">
			<!-- nav -->


			<!-- <div class="w-full">
				<div class="flex spacing-x-[10px] border-[1px] border-main-light border-solid">
					<input
						bind:value={clientUser.value.displayName}
						placeholder="Enter name..."
						class="text-white bg-main-dark h-[50px] p-[10px] flex-1"
					/>
					<button class="text-black bg-white p-[10px]">save</button>
				</div>
			</div> -->

			<!-- results --> 
				<div class="
					relative
					flex
					items-center
					bg-[#777303]
					rounded-[25px]
					overflow-hidden
					before:w-full
					before:h-1/2
					before:bg-[#F8F32B]
					before:blur-xl
					before:absolute before:animate-spin
					{arePointsVisible.value ? "before:hidden": "before:block"}
					">
						<div class="
						bg-clip-padding
						w-full h-fit
						p-[30px]
						flex 
						justify-center
						items-center text-3xl 
						text-black
						font-bold
						bg-[#F8F32B]
						border-transparent
						border-[7px]
						rounded-[25px]
						overflow-hidden
						relative
						opacity-100"
						>

						<span class="relative">				
							{arePointsVisible.value ? roomPointsDisplayValue : randomQuip()}
						</span>
				</div>
			</div>


			{#if arePointsVisible.value}
				<!-- tally -->
				<div class="w-full h-fit grid grid-cols-2 gap-[10px]">
					{#each pointsTally as [key, value]}
						<div
							class="h-[50px] px-[20px] py-[10px] text-white bg-main-dark border-main-light border-[2px] flex justify-between items-center rounded-full"
						>
							{key != 0 ? key : "None"}
							<div class="">x{value.length}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<Separator.Root
			class="shrink-0 bg-main-dark data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[2px]"
		/>

		<!-- point selection -->
		<div class="point-selection w-full">
			<PointSelector onPointSelection={updatePointSelection}></PointSelector>
		</div>

		<Separator.Root
			class="shrink-0 bg-main-dark data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[3px]"
		/>

		<!-- user statuses -->
		<div class="w-full grid grid-cols-2 gap-3">
			<!-- current user should always appear at the front, user'displayName always be visible -->
			<UserStatus pointsRevealed={true} roomUser={clientUser.value}></UserStatus>
			<!-- display all other users after current user -->
			{#each remoteUsers.value as user}
				<UserStatus pointsRevealed={arePointsVisible.value} roomUser={user}></UserStatus>
			{/each}
		</div>
	</div>
</div>
