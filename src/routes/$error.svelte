<!-- This is only rendered when a page fails to load,
     not when there is an uncaught error in a function. -->
<script>
  export let status;
  export let error;

  console.error('$error.svelte: error =', error);

  let message = '';
  $: if (error) {
    // Get first line of error message to omit stack trace.
    const index = error.message.indexOf('\n');
    message = error.message.substring(0, index);
  }
</script>

<section class="page">
  <p><b>Status</b>: {status}</p>
  <p><b>Message</b>: {message}</p>
</section>

<style>
  .page {
    background: linear-gradient(#e66465, #9198e5);
    color: white;
    font-size: 2rem;
    height: 100%;
    padding: 2rem;
  }
</style>
