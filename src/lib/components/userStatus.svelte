<script lang="ts">
	import type { RoomUser } from "$lib/models/roomUser";
	import { arePointsVisible } from "$lib/stores/points.svelte";
	import { Toggle } from "bits-ui";

	interface Props {
		roomUser: RoomUser;
		pointsRevealed: boolean;
		onSelect?: any;
	}

	let { roomUser, pointsRevealed, onSelect = () => {console.log("NO ON SELECT PROVIDED")} }: Props = $props();

	let arePointsSelectedByUser = $derived(!!roomUser.pointSelection); // return the truthy value
	let displayValue = $derived(arePointsSelectedByUser && pointsRevealed ? roomUser.pointSelection : "..."); 


</script>
 
<Toggle.Root onPressedChange={onSelect} disabled={true} pressed={arePointsSelectedByUser && pointsRevealed} class="
	flex
	justify-between items-center
	p-[10px] px-[20px]
	h-[50px]
	rounded-full
	border-[2px]
	border-main-light
	border-solid
	text-white
	bg-main-dark
	data-[state=on]:bg-main-light"
	>
	<div>{roomUser.displayName}</div>
	<div>{displayValue}</div>
</Toggle.Root>