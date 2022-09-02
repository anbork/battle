<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Header from '../../components/Header.svelte'

  onMount(async () => {
    document.documentElement.classList.add('mountings')
  })

  onDestroy(async () => {
    document.documentElement.classList.remove('mountings')
  })
</script>

<style global>
  html.mountings {
    background: url('/img/main.jpg') center top no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }
  html.mountings body {
    min-height: 100vh;
    background: url('/img/mountains.png') center bottom no-repeat;
    background-attachment: fixed;
    background-size: cover;
    color: #fff;
    font-family: Montserrat,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
  html.mountings h1, html.mountings h2 {
    font-weight: 900;
  }
</style>


<Header />

<div class="container pt-4">
  <slot></slot>
</div>