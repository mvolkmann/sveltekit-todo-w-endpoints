<script context="module">
  // Since this page is static, it can be pre-rendered on the server.
  export const prerender = true;
</script>

<section>
  <p>
    This is a simple todo app developed to demonstrate using Svelte.<br />
    It was first presented at the GOTO Aarhus conference,<br />
    June 9-11 2021, in Copenhagen, Denmark.
  </p>
</section>

<style>
  p {
    display: inline-block;

    background-color: var(--primary-color);
    border: 5px solid var(--secondary-color);
    border-radius: 1rem;
    color: var(--text-color);
    padding: 1rem;
    transition: background-color var(--transition-duration);
    transition: color var(--transition-duration);
    width: auto;
  }

  section {
    display: flex;
    justify-content: center;
  }
</style>
