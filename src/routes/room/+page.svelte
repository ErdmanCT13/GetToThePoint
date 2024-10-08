<script lang="ts">
	import PointSelector from '$lib/components/pointSelector.svelte';
	import UserStatus from '$lib/components/userStatus.svelte';
	import { roomUsers } from '$lib/stores/roomUsers';
	import { currentRoomUser } from '$lib/stores/currentUser';
</script>

<div class="content">
	<div class="controls">
		<input bind:value={$currentRoomUser.name} placeholder="Enter name..." />
	</div>

	<div class="point-selection">
		<PointSelector></PointSelector>
	</div>

	<div class="user-status-list">
		<!-- current user should always appear at the front -->
		<UserStatus roomUser={$currentRoomUser}></UserStatus> 
		<!-- display all other users after current user -->
		{#each $roomUsers as user}
			<UserStatus roomUser={user}></UserStatus>
		{/each}
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		background: black;
		height: 100vh;
		width: 100vw;
	}

	.controls {
		display: flex;
	}

	.user-status-list {
		display: flex;
		flex-wrap: wrap;
	}
</style>
