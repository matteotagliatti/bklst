<script lang="ts">
	export let htmlFor: string = 'test';
</script>

<label class="w-28 text-sm text-neutral-400 shrink-0" for={htmlFor}>
	<slot />
</label>
