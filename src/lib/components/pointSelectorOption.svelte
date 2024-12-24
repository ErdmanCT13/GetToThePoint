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
    text-white
    data-[state=off]:bg-main-dark
    data-[state=on]:bg-main-light"
    value={value}>
    {value}
</ToggleGroup.Item>