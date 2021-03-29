<script>
  import {onMount} from 'svelte';
  import {autoFocusStore, darkModeStore} from '$lib/stores';
  import Toggle from '$lib/Toggle.svelte';

  let fontSize;
  let html;

  onMount(() => {
    html = document.querySelector('html');
    fontSize = localStorage.getItem('font-size');
    fontSize = fontSize ? Number(fontSize) : 16;
  });

  $: if (fontSize) {
    localStorage.setItem('font-size', fontSize);
    html.style.fontSize = fontSize + 'px';
  }

  // We don't want auto-focus to be true by default
  // because that is bad for users that use screen readers.
  // But other users can choose to enable it.
  function setAutoFocus(event) {
    $autoFocusStore = event.target.checked;
    localStorage.setItem('auto-focus', $autoFocusStore.toString());
  }

  function toggleColorMode() {
    $darkModeStore = !$darkModeStore;
    localStorage.setItem('dark-mode', $darkModeStore.toString());
    document.body.classList.toggle('dark-mode');
  }
</script>

<div class="row">
  <span>Light</span>
  <Toggle on:toggle={toggleColorMode} value={$darkModeStore} />
  <span>Dark</span>
</div>

<div class="row">
  <input
    id="autofocus-cb"
    type="checkbox"
    on:change={setAutoFocus}
    checked={$autoFocusStore}
  />
  <label for="autofocus-cb">Auto-focus Todo Text</label>
</div>

<div class="font-size row">
  <label for="font-size-input">Font Size</label>
  <input
    id="font-size-input"
    type="number"
    min="10"
    max="24"
    bind:value={fontSize}
  />
</div>

<style>
  .font-size > label {
    margin-right: 0.5rem;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .row > :global(.toggle) {
    margin: 0 0.5rem;
  }

  .row:not(:first-of-type) {
    margin-top: 1rem;
  }
</style>
