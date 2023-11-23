<script lang="ts">
  export let id: string;
  export let name: string = id;
  export let checked: boolean;
  export let disabled: boolean = false;
</script>

<div class="flex">
  <input
    {disabled}
    {id}
    {name}
    class="peer relative h-5 w-5 shrink-0 appearance-none border-none bg-transparent text-transparent focus-within:ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 {disabled
      ? ''
      : 'hover:cursor-pointer'}"
    type="checkbox"
    bind:checked
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="pointer-events-none absolute h-5 w-5 fill-none stroke-red-500 peer-checked:!fill-red-500"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
      d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
    /></svg
  >
</div>
