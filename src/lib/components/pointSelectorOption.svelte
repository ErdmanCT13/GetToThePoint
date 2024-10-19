<script lang="ts">
	import { ToggleGroup } from "bits-ui";

    export let value;
</script>

<ToggleGroup.Item class="data-[state=off]:bg-red-500 data-[state=on]:bg-green-500" value={value}>{value}</ToggleGroup.Item>