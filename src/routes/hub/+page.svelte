<script lang="ts">
  import Header from '../../components/Header.svelte'
  import { onMount } from 'svelte'
  import Loader from '../../components/Loader.svelte';
  import Footer from '../../components/Footer.svelte';
  import type { LemonNFT } from '../../threejs/lemon'
  import { wallet } from '../../utils/near'

  let accountId = wallet.getAccountId()


  let lemons: LemonNFT[];

  onMount(async () => {
    if (accountId) {
      const response = await fetch(`/api?url=/rest/nft_tokens?owner_id=${accountId}`);
      lemons = (await response.json()).rows;
    }

    const { Model } = await import('../../threejs/hub')
    new Model({
      lemons,
      dom: 'threejs',
      cam: 90,
      globalScale: 6,
      translateY: -6.87
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
    
    <Header />
    <div class="layer" style="top: 0%; width: 100%; height: 100vh;">
      <div id="threejs" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></div>
    </div>
  </div>

  <Loader />
  <Footer />
</div>
