<script lang="ts">
	import PointSelector from '$lib/components/pointSelector.svelte';
	import UserStatus from '$lib/components/userStatus.svelte';
	import { allUsers, remoteUsers } from '$lib/stores/users';
	import { clientUser } from '$lib/stores/users';
	import { Button } from 'bits-ui';
	import { arePointsVisible } from '$lib/stores/points';

	function add(accumulator: number, value: string | undefined | null) {
		return accumulator + Number(value);
	}

	$: usersWithPointSelected = $allUsers.filter(user => user.pointSelection) // filter out the falsy values
	$: averagePoints = usersWithPointSelected.map((user) => user.pointSelection).reduce(add, 0) / usersWithPointSelected.length; // with initial value to avoid when the array is empty

	function toggleArePointsVisible() {
		$arePointsVisible = !$arePointsVisible;
	}
</script>

<div class="content">
	<div class="controls">
		<input bind:value={$clientUser.name} placeholder="Enter name..." />
	</div>

	<div class="bg-white p-[10px]">
		<span>{averagePoints}</span>
		<button
			on:click={toggleArePointsVisible}
			class="
			bg-orange-500
		
		">reveal</button
		>
	</div>

	<div class="point-selection">
		<PointSelector></PointSelector>
	</div>

	<div class="user-status-list">
		<!-- current user should always appear at the front, user's points should always be visible -->
		<UserStatus pointsRevealed={true} roomUser={$clientUser}></UserStatus>
		<!-- display all other users after current user -->
		{#each $remoteUsers as user}
			<UserStatus pointsRevealed={$arePointsVisible} roomUser={user}></UserStatus>
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
