<script>
  import {page} from '$app/stores';
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
  </header>

  <section>
    <slot />
  </section>

  <footer>SvelteKit demo by R. Mark Volkmann</footer>
</main>

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
    background-color: var(--secondary-color);
    font-size: 1.5rem;
    padding: 1rem;
  }

  main {
    display: flex;
    flex-direction: column;

    height: 100vh;
    padding: 0;
  }

  section {
    flex-grow: 1;
  }
</style>
