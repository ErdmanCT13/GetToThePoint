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
	p-[10px]
	h-[50px]
	border-[1px]
	text-white
	bg-main-dark
	data-[state=on]:border-main-light
	data-[state=off]:border-main-dark"
	>
	<div>{roomUser.displayName}</div>
	<div>{displayValue}</div>
</Toggle.Root>