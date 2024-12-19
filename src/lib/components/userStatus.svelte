<script lang="ts">
	import type { RoomUser } from "$lib/models/roomUser";
	import { Toggle } from "bits-ui";

	export let roomUser: RoomUser;
	export let pointsRevealed: boolean;
	export let onSelect: any = () => {console.log("NO ON SELECT PROVIDED")};

	$: arePointsSelectedByUser = !!roomUser.pointSelection; // return the truthy value
	$: displayValue = arePointsSelectedByUser && pointsRevealed ? roomUser.pointSelection : "..."; 


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