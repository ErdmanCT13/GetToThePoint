<script lang="ts">
	import { ToggleGroup } from "bits-ui";

    interface Props {
        value: any;
        children: any;
    }
    
    let { value }: Props = $props();
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