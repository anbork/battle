<script lang="ts">
  import { onMount } from 'svelte';
  import { nearConnection } from '../utils/near'

  onMount(async () => {
    await nearConnection()
  })
</script>

<style global>
  body {
    font-family: Montserrat,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
</style>

<slot></slot>