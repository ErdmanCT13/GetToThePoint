<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<!-- this will be the starting point for next time. exposing the user id like this means we can update the db -->
hello! {data.newRoomUserId} 