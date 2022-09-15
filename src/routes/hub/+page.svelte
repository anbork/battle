<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '../../components/Header.svelte'
  import Loader from '../../components/Loader.svelte';
  import Footer from '../../components/Footer.svelte';
  import type { LemonNFT } from '../../utils/types'
  import { near, nftTokensForOwner, nftMintFull } from '../../utils/near'
  import { Model as Hub, type Model as HubType } from '../../threejs/hub'
    
  let lemons: LemonNFT[] = [];
  let showMint = false
  let hub: HubType;

  onMount(() => {
    near.subscribe(async ({ accountId }) => {
      if (accountId === undefined) return
      if (accountId) {
        const nftTokens = await nftTokensForOwner(accountId) as LemonNFT[];
        lemons = nftTokens.filter(token => token?.model?.kind === 'lemon')
        if (lemons.length < 1) showMint = true
      } else {
        lemons = []
        showMint = true
      }

      if (hub) {
        hub.setLemons(lemons)
      } else {
        hub = new Hub({
          lemons,
          dom: 'threejs',
          events: {
            onLoadModels: () => {
              document.getElementById('loader')!.style.opacity = '0';
            }
          }
        })
      }
    });
  })
</script>

<style>
  :global(.swal-modal) {
    background-color: rgba(255,255,255,0.84);
    border: 2px solid white;
  }
  :global(.swal-button--cancel) {
    background-color: #fff;
    border: 1px solid #888;
  }
  
  .home {
    background: #000 ;
    overflow: hidden; 
    height: 100vh;
    width: 100vw; 
  }
  .home-inner {
    height: 100vh;
    width: 100vw; 
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
    {#if showMint}
      <div class="container sticky-top text-center" style="z-index: 980;">
        <button class="btn btn-lg btn-light px-4" on:click={nftMintFull}>
          Mint NFT (Testnet)
        </button>
      </div>
    {/if}
    <div class="layer" style="top: 0%; width: 100%; height: 100vh;">
      <div id="threejs" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></div>
    </div>
  </div>

  <Loader />
  <Footer />
</div>
