<script>
  import Icon from 'fa-svelte';
  import {faCog} from '@fortawesome/free-solid-svg-icons';

  import {page} from '$app/stores';
  import {darkModeStore} from '$lib/stores';
  import Dialog from '$lib/Dialog.svelte';
  import Toggle from '$lib/Toggle.svelte';

  let darkMode = false;
  let dialog;

  $: path = $page.path;
  $: console.log('$layout.svelte x: darkMode =', darkMode);

  const routes = [
    {name: 'About', url: '/about'},
    {name: 'Todos', url: '/'}
  ];

  function settings() {
    dialog.showModal();
  }

  function toggleMode() {
    darkMode = !darkMode;
    localStorage.setItem('dark-mode', darkMode.toString());
    document.body.classList.toggle('dark-mode');
    $darkModeStore = darkMode;
  }
</script>

<main>
  <header>
    <nav>
      {#each routes as {name, url}}
        <a class:current={url === path} href={url}>{name}</a>
      {/each}
    </nav>
    <button class="bare" on:click={settings}>
      <Icon icon={faCog} />
    </button>
  </header>

  <section>
    <slot />
  </section>

  <footer>SvelteKit demo by R. Mark Volkmann</footer>
</main>

<Dialog title="Settings" bind:dialog>
  <div class="row">
    <span>Light</span>
    <Toggle on:toggle={toggleMode} value={darkMode} />
    <span>Dark</span>
  </div>
</Dialog>

<style>
  a {
    color: var(--primary-color);
    margin-right: 1rem;
    text-decoration: none;
  }

  a.current {
    font-weight: bold;
  }

  footer {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    padding: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;

    background-color: var(--secondary-color);
    font-size: 1.5rem;
    padding: 1rem;
  }

  header :global(.fa-svelte) {
    --size: 1.5rem;

    color: var(--primary-color);
    height: var(--size);
    width: var(--size);
  }

  main {
    display: flex;
    flex-direction: column;

    height: 100vh;
    padding: 0;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .row > :global(.toggle) {
    margin: 0 0.5rem;
  }

  section {
    flex-grow: 1;
  }
</style>
