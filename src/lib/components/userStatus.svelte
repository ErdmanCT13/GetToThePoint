<script lang="ts">
	import type { RoomUser } from "$lib/models/roomUser";
	import { Toggle } from "bits-ui";

	export let roomUser: RoomUser;
	export let pointsRevealed: boolean;
	export let onSelect: any = () => {console.log("NO ON SELECT PROVIDED")};

	$: arePointsSelectedByUser = !!roomUser.pointSelection; // return the truthy value
	$: displayValue = arePointsSelectedByUser && pointsRevealed ? roomUser.pointSelection : "... (Points hidden)"; 


</script>
 
<Toggle.Root onPressedChange={onSelect} disabled={true} pressed={arePointsSelectedByUser && pointsRevealed} class="
	text-white
	mx-[10px]
	p-[10px]
	border-[1px]
	data-[state=on]:border-white
	data-[state=on]:text-white
	data-[state=off]:border-gray-700
	data-[state=off]:text-gray-700"
	>
	{`${roomUser.displayName} ${displayValue}`}
</Toggle.Root>