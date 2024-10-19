<script lang="ts">
	import { Toggle } from "bits-ui";
	import { RoomUser } from "$lib/models/roomUser";

	export let roomUser: RoomUser;
	export let pointsRevealed: boolean;

	$: arePointsSelectedByUser = !!roomUser.pointSelection; // return the truthy value
	$: displayValue = arePointsSelectedByUser && pointsRevealed ? roomUser.pointSelection : "..."; 
</script>
 
<Toggle.Root disabled={true} pressed={arePointsSelectedByUser && pointsRevealed} class="
	text-white
	mx-[10px]
	p-[10px]
	data-[state=on]:bg-green-600
	data-[state=off]:bg-red-700">
	{`${roomUser.name} ${displayValue}`}
</Toggle.Root>