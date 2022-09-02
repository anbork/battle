<script lang="ts">
  import { onMount } from 'svelte'
  import Loader from '../components/Loader.svelte';
  import Logo from '../components/Logo.svelte'
  import Countdown from '../components/Countdown.svelte';
  import Footer from '../components/Footer.svelte';

  onMount(async () => {
    const { Model } = await import('../threejs/homepage')
    new Model({
      dom: 'homecity',
      model: '/models/MainMenu_Stripes_animated.glb?020620220003',
      hdr: '/models/venice_sunset_1k.hdr?020620220003',
    })
  })
</script>

<style>
  .home {
    background: #000 ;
    overflow: hidden; 
    height: 100vh;
    width: 100vw; 
  }
  .home-inner {
    height: 100vh;
    width: 101vw; 
    position: relative;
    margin: 0 auto; 
  }
  .layer {
    color: #fff;
    position: absolute;
  }
</style>

<div class="home">
  <div class="home-inner">
    <div class="layer" style="top: 0%; width: 100%; height: 100vh;">
      <div id="homecity" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></div>
    </div>
  </div>

  <Loader />
  <div class="navbar fixed-top">
    <div class="container">
      <Logo />
      <Countdown />
    </div>
  </div>
  <Footer />
</div>