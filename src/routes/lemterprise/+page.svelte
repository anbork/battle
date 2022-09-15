<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Loader from '../../components/Loader.svelte';
  import Footer from '../../components/Footer.svelte';
  import { actions } from '../../threejs/lemterprise';
  import { Model as Lemterprise} from '../../threejs/lemterprise'

  let isBackVisible: boolean = false

  const unsubscribe = actions.subscribe(acts => {
    isBackVisible = acts.isBackVisible
  });


  const goBack = () => {
    actions.update(acts => ({...acts, activateBack: true}))
  }

  const goCapsule = (capsule: string) => () => {
    actions.update(acts => ({...acts, activateCapsule: capsule}))
  }

  onMount(async () => {
    new Lemterprise({
      dom: 'threejs',
      arena: '/models/lemterprise_only1.glb',
      cam: 28,
      camPos: [0, -10, 120]
    })
  })

  onDestroy(unsubscribe);
</script>

<style>
    .home {
        background: #000 ;
        /* background-image: url(/img/home/main.jpg);
        background-size: cover;
        background-position: center; */
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
        position: absolute;
    }
    .back-btn {
        margin: 30px 0 0 0;
        width: 15vw;
        max-width: 198px;
        background: #fff;
        color: #000;
    }
</style>


<div class="home">
  <div class="home-inner">

    <div class="container sticky-top text-center" style="z-index: 980;">
      <div class="header-container" style="background: none;">
        <div class="container">
            <div class="header-inner">                
                <div class="top-menu d-flex">
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'a'} on:click|preventDefault={goCapsule('a')}>
                        <span class="w-100 nowrap">Team</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'c'} on:click|preventDefault={goCapsule('c')}>
                        <span class="w-100 nowrap">Advisers</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'b'} on:click|preventDefault={goCapsule('b')}>
                        <span class="w-100 nowrap">Roadmap</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'd'} on:click|preventDefault={goCapsule('d')}>
                        <span class="w-100 nowrap">Backers</span>
                    </button>
                    <button class="btn btn-light d-flex one-width" class:active={$actions.currentCapsule == 'e'} on:click|preventDefault={goCapsule('e')}>
                        <span class="w-100 nowrap">Tokenomics</span>
                    </button>
                </div>
            </div>
            
            {#if isBackVisible}
                <div class="header-inner">
                    <button class="btn btn-light d-flex back-btn" on:click|preventDefault={goBack}>
                        <span class="w-100 nowrap">
                            <span style="position: relative; top: 0px; left: -2px; font-size: 22px; line-height: 14px;">&larr</span> 
                            Return back
                        </span>
                    </button>
                </div>
            {/if}
        </div>
      </div>
    </div>

    <div class="layer" style="top: 0%; width: 100%; height: 100vh;">
      <div id="threejs" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></div>
    </div>
  </div>

  <Loader />
  <Footer />
</div>