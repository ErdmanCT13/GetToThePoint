<script lang="ts">
	import { ToggleGroup } from "bits-ui";
	import { clientUser } from "$lib/stores/users";
	import PointSelectorOption from "./pointSelectorOption.svelte";

	export let onPointSelection: any = () => {}; // no-op
</script>
 
<ToggleGroup.Root onValueChange={onPointSelection} type="single" class="point-selection-list">
	<PointSelectorOption value="1">1</PointSelectorOption>
	<PointSelectorOption value="2">2</PointSelectorOption>
	<PointSelectorOption value="3">3</PointSelectorOption>
	<PointSelectorOption value="5">5</PointSelectorOption>
	<PointSelectorOption value="8">8</PointSelectorOption>
	<PointSelectorOption value="13">13</PointSelectorOption>
	<PointSelectorOption value="21">21</PointSelectorOption>
	<PointSelectorOption value="50">50</PointSelectorOption>
	<PointSelectorOption value="100">100</PointSelectorOption>
</ToggleGroup.Root>