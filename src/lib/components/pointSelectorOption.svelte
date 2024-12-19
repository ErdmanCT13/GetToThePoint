<script lang="ts">
	import { ToggleGroup } from "bits-ui";

    export let value;
</script>

<ToggleGroup.Item class=
    "h-[50px]
    data-[state=off]:bg-black
    data-[state=off]:text-white
    data-[state=on]:bg-white
    data-[state=on]:text-black"
    value={value}>
    {value}
</ToggleGroup.Item>