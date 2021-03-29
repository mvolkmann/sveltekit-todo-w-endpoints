<script>
  import Icon from 'fa-svelte';
  import {onMount} from 'svelte';
  import {faCog} from '@fortawesome/free-solid-svg-icons';

  import {page} from '$app/stores';
  import Dialog from '$lib/Dialog.svelte';
  import Settings from '$lib/Settings.svelte';
  import {autoFocusStore, darkModeStore} from '$lib/stores';
  import '../app.css';

  let dialog;

  $: path = $page.path;

  const routes = [
    {name: 'About', url: '/about'},
    {name: 'Todos', url: '/todos'}
  ];

  onMount(() => {
    setupColorMode();
    setupAutoFocus();
  });

  function setupAutoFocus() {
    let autoFocus = localStorage.getItem('auto-focus');
    autoFocusStore.set(autoFocus === 'true');
  }

  function setupColorMode() {
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode) {
      // Convert from string to boolean.
      darkMode = darkMode === 'true';
    } else {
      // Get from system preferences.
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (darkMode) document.body.classList.add('dark-mode');
    darkModeStore.set(darkMode);
  }
</script>

<main>
  <header>
    <nav>
      {#each routes as {name, url}}
        <!-- Using prefetch causes the component code to be downloaded on hover
             and its load function, if it exists, will be run. -->
        <a sveltekit:prefetch class:selected={url === path} href={url}>{name}</a
        >
      {/each}
    </nav>
    <button class="bare" on:click={() => dialog.showModal()}>
      <Icon icon={faCog} />
    </button>
  </header>

  <section>
    <slot />
  </section>

  <footer>SvelteKit demo by R. Mark Volkmann</footer>
</main>

<Dialog title="Settings" bind:dialog>
  <Settings />
</Dialog>

<style>
  a {
    color: var(--primary-color);
    margin-right: 1rem;
    text-decoration: none;
    transition: color var(--transition-duration);
  }

  a.selected {
    font-weight: bold;
  }

  footer {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    padding: 1rem;
    transition: background-color var(--transition-duration);
    transition: color var(--transition-duration);
  }

  header {
    display: flex;
    justify-content: space-between;

    background-color: var(--secondary-color);
    font-size: 1.5rem;
    padding: 1rem;
    transition: background-color var(--transition-duration);
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

    background-color: var(--bg-color);
    color: var(--text-color);
    height: 100vh;
    padding: 0;
    transition: background-color var(--transition-duration);
    transition: color var(--transition-duration);
  }

  section {
    flex-grow: 1;
  }
</style>
