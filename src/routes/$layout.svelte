<script>
  import {browser} from '$app/env';
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';
  import {faCog, faSearch} from '@fortawesome/free-solid-svg-icons';
  import Icon from 'fa-svelte';
  import {onMount} from 'svelte';

  import Dialog from '$lib/Dialog.svelte';
  import Settings from '$lib/Settings.svelte';
  import {autoFocusStore, darkModeStore, tokenStore} from '$lib/stores';
  import {getBrowser} from '$lib/util';
  import '../app.css';

  const PROTECTED_ROUTES = ['/todos'];

  let dialog;

  $: path = $page.path;

  $: if (
    browser &&
    $page.path !== '/login' &&
    PROTECTED_ROUTES.includes($page.path) &&
    !$tokenStore
  ) {
    goto('/login');
  }

  const routes = [
    {name: 'About', url: '/about'},
    {name: 'Todos', url: '/todos'}
  ];

  onMount(() => {
    document.body.classList.add(getBrowser());
    setupAutoFocus();
    setupColorMode();
  });

  async function logout() {
    try {
      const res = await fetch('/api/logout');
      console.log('$layout.svelte logout: res =', res);
      tokenStore.set('');
      goto('/login');
    } catch (e) {
      console.error('failed to logout:', e);
    }
  }

  function search() {
    alert('Search is not implemented yet.');
  }

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
    <div class="name">
      <div class="first-name">Mark</div>
      <div class="last-name">Volkmann</div>
    </div>
    <nav>
      {#each routes as {name, url}}
        <!-- Using prefetch causes the component code to be downloaded on hover
             and its load function, if it exists, will be run. -->
        <a sveltekit:prefetch class:selected={url === path} href={url}>{name}</a
        >
      {/each}
      <!-- If not on login page and not authenticated, add Login link. -->
      {#if path !== '/login' && !$tokenStore}
        <a sveltekit:prefetch href="/login">Login</a>
      {/if}
      <!-- If not on login page and authenticated, add a Logout button. -->
      {#if path !== '/login' && $tokenStore}
        <button class="bare" on:click={logout}>Logout</button>
      {/if}
      <button class="bare" on:click={search}>
        <Icon icon={faSearch} />
      </button>
      <button class="bare settings" on:click={() => dialog.showModal()}>
        <Icon icon={faCog} />
      </button>
    </nav>
  </header>

  <section>
    <slot />
  </section>
</main>

<Dialog title="Settings" bind:dialog>
  <Settings />
</Dialog>

<style>
  a {
    color: white;
    margin-right: 1.5rem;
    text-decoration: none;
    transition: color var(--transition-duration);
  }

  a.selected {
    font-weight: bold;
  }

  .first-name {
    font-weight: lighter;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* background-color: var(--primary-color); */
    background-color: transparent;
    padding: 1rem;
    transition: background-color var(--transition-duration);
  }

  header :global(.fa-svelte) {
    --size: 1.2rem;

    position: relative;
    top: 3px;

    color: white;
    height: var(--size);
    width: var(--size);
  }

  .last-name {
    font-weight: bold;
    margin-left: 0.5rem;
  }

  main {
    display: flex;
    flex-direction: column;

    color: var(--text-color);
    height: 100vh;
    padding: 0;
    transition: background-color var(--transition-duration);
    transition: color var(--transition-duration);
  }

  .name {
    display: flex;

    color: var(--tertiary-color);
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  nav {
    display: flex;
    align-items: center;
  }

  nav > button:not(:last-of-type) {
    font-size: 1rem;
    margin-right: 1.5rem;
  }

  section {
    display: flex;
    justify-content: center;

    flex-grow: 1;
  }

  section > :global(*) {
    background-color: var(--bg-color);
    border: 1px solid white;
    border-bottom: 1rem solid var(--tertiary-color);
    display: inline-block;
    margin: 3rem auto auto auto;
    padding: 2rem;
  }

  .settings {
    border-left: 1px solid white;
    border-radius: 0;
    padding-left: 1.5rem;
  }
</style>
