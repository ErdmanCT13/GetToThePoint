<script lang="ts">
	import { ToggleGroup } from "bits-ui";
	import { clientUser } from "$lib/stores/users.svelte";
	import PointSelectorOption from "./pointSelectorOption.svelte";
	import { pointsValueString } from "$lib/stores/points.svelte";

	interface Props {
		onPointSelection?: any;
	}

	let { onPointSelection = () => {} }: Props = $props();

	// let selection: string = $derived(Number(selection));

</script>
 
<ToggleGroup.Root bind:value={pointsValueString.value} onValueChange={onPointSelection} type="single" class="grid gap-[10px] grid-cols-5 overflow-hidden">
	<PointSelectorOption value=1>1</PointSelectorOption>
	<PointSelectorOption value=2>2</PointSelectorOption>
	<PointSelectorOption value=3>3</PointSelectorOption>
	<PointSelectorOption value=5>5</PointSelectorOption>
	<PointSelectorOption value=8>8</PointSelectorOption>
	<PointSelectorOption value=13>13</PointSelectorOption>
	<PointSelectorOption value=21>21</PointSelectorOption>
	<PointSelectorOption value=50>50</PointSelectorOption>
	<PointSelectorOption value=100>100</PointSelectorOption>
	<PointSelectorOption value=200>200</PointSelectorOption>
</ToggleGroup.Root>