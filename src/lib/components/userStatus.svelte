<script lang="ts">
	import type { RoomUser } from "$lib/models/roomUser";
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
	justify-between
	text-white
	p-[10px]
	border-[1px]
	h-[50px]
	data-[state=on]:border-white
	data-[state=on]:text-white
	data-[state=off]:border-gray-700
	data-[state=off]:text-gray-700"
	>
	<div>{roomUser.displayName}</div>
	<div>{displayValue}</div>
</Toggle.Root>