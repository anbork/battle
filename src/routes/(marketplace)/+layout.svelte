<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Logo from '../../components/Logo.svelte'
  import Countdown from '../../components/Countdown.svelte'
  import { page } from '$app/stores';

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



<nav class="navbar navbar-expand-lg sticky-top navbar-dark">
  <div class="container">
    <Logo />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMain">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
        <li class="nav-item">
          <a class="nav-link" class:active={$page.url.pathname === '/shop'}  href="/shop">Shop</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" class:active={$page.url.pathname === '/history'} href="/history">History</a>
        </li>
      </ul>
      <Countdown />
    </div>
  </div>
</nav>

<div class="container pt-4">
  <slot></slot>
</div>