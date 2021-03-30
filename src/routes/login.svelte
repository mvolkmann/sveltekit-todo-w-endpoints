<script context="module">
  // Since this page is static, it can be pre-rendered on the server.
  export const prerender = true;
</script>

<script>
  import {browser} from '$app/env';
  import {goto} from '$app/navigation';
  import {authenticatedStore} from '$lib/stores';

  let email = 'r.mark.volkmann@gmail.com';
  let error = '';
  let password = 'secret';

  $: canLogin = email && password;

  function forgotPassword() {
    alert('Forgot password is not implemented yet.');
  }

  function login() {
    if (password === 'secret') {
      error = '';
      authenticatedStore.set(true);
      if (browser) goto('/about');
    } else {
      error = 'invalid email or password';
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="row">
    <label for="email">Email</label>
    <input id="email" type="email" autocomplete="email" bind:value={email} />
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      autocomplete="current-password"
      bind:value={password}
    />
  </div>
  <div class="row">
    <button disabled={!canLogin}>Login</button>
    <button type="button" on:click={forgotPassword}>Forgot Password</button>
  </div>
  <div class="error row">{error}</div>
</form>

<style>
  input {
    width: 250px;
  }

  label {
    display: inline-block;
    text-align: right;
    width: 72px;
  }

  .row {
    margin-top: 0.5rem;
    text-align: center;
  }
</style>
