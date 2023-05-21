<script>
  import Layout from "$lib/components/Layout.svelte";
  import Header from "$lib/components/Header.svelte";
  export let data;
</script>

<Layout>
  <Header {data} />
  <h1 class="font-bold">Ciao</h1>
  <p>Prova per vedere se font è veramente Inter</p>
</Layout>
