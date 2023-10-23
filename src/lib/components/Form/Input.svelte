<script lang="ts">
  import InputContainer from "./InputContainer.svelte";
  import Label from "./Label.svelte";

  export let id: string;
  export let name: string = id;
  export let type: string = "text";
  export let required: boolean = true;
  export let label: string;
  export let placeholder: string;
  export let value: string | null = null;
  export let onChange = () => {};

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    value = target.value;
  };
</script>

<InputContainer>
  <Label htmlFor={id}>{label}</Label>
  <input
    {id}
    class="shrink grow border-none p-0 text-sm focus-within:ring-0 focus:outline-none focus:ring-0"
    {type}
    {required}
    {placeholder}
    {value}
    {name}
    on:change|preventDefault={onChange}
    on:input={handleInput}
  />
</InputContainer>
