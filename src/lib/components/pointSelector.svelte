<script lang="ts">
	import { ToggleGroup } from "bits-ui";
	import { currentRoomUser } from "$lib/stores/currentUser";

	function updatePointSelection(value: string|undefined){
		$currentRoomUser.pointSelection = value;
	}
</script>
 
<ToggleGroup.Root onValueChange={updatePointSelection} type="single" class="point-selection-list">
	<ToggleGroup.Item class="point-selection" value="1">1</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="2">2</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="3">3</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="5">5</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="8">8</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="13">13</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="21">21</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="50">50</ToggleGroup.Item>
	<ToggleGroup.Item class="point-selection" value="100">100</ToggleGroup.Item>
</ToggleGroup.Root>

<style>
	:global(.point-selection-list){
		display: flex;
	}

	:global(.point-selection[data-state="on"]){
		background-color: green;
	}

	:global(.point-selection[data-state="off"]){
		background-color: red;
	}
</style>