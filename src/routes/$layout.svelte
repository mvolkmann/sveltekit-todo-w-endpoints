<script>
  import Icon from 'fa-svelte';
  import {faCog} from '@fortawesome/free-solid-svg-icons';

  import {page} from '$app/stores';
  import Dialog from '$lib/Dialog.svelte';
  import Settings from '$lib/Settings.svelte';

  let dialog;

  $: path = $page.path;

  const routes = [
    {name: 'About', url: '/about'},
    {name: 'Todos', url: '/'}
  ];
</script>

<main>
  <header>
    <nav>
      {#each routes as {name, url}}
        <a class:current={url === path} href={url}>{name}</a>
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

    background-color: var(--bg-color);
    color: var(--text-color);
    height: 100vh;
    padding: 0;
  }

  section {
    flex-grow: 1;
  }
</style>
