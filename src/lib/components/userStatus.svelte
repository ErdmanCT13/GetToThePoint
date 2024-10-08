<script lang="ts">
	import { Toggle } from "bits-ui";
	import { RoomUser } from "$lib/stores/roomUsers";

	export let roomUser: RoomUser;

	$: isDisabled = !roomUser.pointSelection; // return the truthy value
	$: displayValue = isDisabled ? "..." : roomUser.pointSelection;
</script>
 
<Toggle.Root disabled={isDisabled} class="user-status">
	{`${roomUser.name} ${displayValue}`}
</Toggle.Root>