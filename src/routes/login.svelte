<script context="module">
  // Since this page is static, it can be pre-rendered on the server.
  export const prerender = true;
</script>

<script>
  import {browser} from '$app/env';
  import {goto} from '$app/navigation';
  import DatePicker from '$lib/DatePicker.svelte';
  import {tokenStore} from '$lib/stores';
  import {postJson, setFetch} from '$lib/fetch-util';

  let email = 'r.mark.volkmann@gmail.com';
  let error = '';
  let password = 'secret';

  $: canLogin = email && password;

  function forgotPassword() {
    alert('Forgot password is not implemented yet.');
  }

  async function login() {
    try {
      setFetch(fetch);
      const token = await postJson('auth', {email, password});
      tokenStore.set(token);
      error = '';
      if (browser) goto('/about'); // cannot call on server
    } catch (e) {
      console.error('login.svelte login: e =', e);
      error = 'invalid email or password';
    }
  }

  async function newAccount() {
    const body = {email, password};
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('login.svelte newAccount: res =', res);
    } catch (e) {
      console.error('login.svelte newAccount: e =', e);
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="error row">{error}</div>

  <h1>Login to your account</h1>

  <label for="email">Email</label>
  <input id="email" type="email" autocomplete="email" bind:value={email} />

  <label for="password">Password</label>
  <input
    id="password"
    type="password"
    autocomplete="current-password"
    bind:value={password}
  />

  <!-- TODO: Consider requiring password to be entered again
         to create a new account. -->

  <div class="buttons">
    <button class="primary" disabled={!canLogin}>Login</button>
    <button type="button" on:click={forgotPassword}>Forgot Password</button>
    <button type="button" on:click={newAccount}>New Account</button>
  </div>
</form>

<!-- <DatePicker /> -->
<style>
  .buttons {
    display: flex;
    grid-gap: 1rem;

    margin-top: 0.5rem;
    text-align: center;
  }

  h1 {
    color: var(--secondary-color);
    font-weight: 100;
    margin-top: 0;
  }

  input {
    box-sizing: border-box;
    margin-bottom: 1rem;
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }
</style>
