<script lang="ts">
    //import type { PageData } from './$types';
    import { Button } from "bits-ui";

    // interface Props {
	// 	data: PageData;
	// }

	// let { data }: Props = $props();
</script>

<div class="bg-black h-screen w-screen flex items-center">
    <form method="POST" class="container w-full">
        <input name="username" type="text" class="h-[50px]">
        <Button.Root type="submit" class="text-black bg-accent-light h-[50px]">
            Enter Room
        </Button.Root>
    </form>
</div>
