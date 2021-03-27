<script>
  import {darkModeStore} from '$lib/stores';
  import Toggle from '$lib/Toggle.svelte';

  function toggleMode() {
    $darkModeStore = !$darkModeStore;
    localStorage.setItem('dark-mode', $darkModeStore.toString());
    document.body.classList.toggle('dark-mode');
  }
</script>

<div class="row">
  <span>Light</span>
  <Toggle on:toggle={toggleMode} value={$darkModeStore} />
  <span>Dark</span>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
  }

  .row > :global(.toggle) {
    margin: 0 0.5rem;
  }
</style>
