<script>
  import {createEventDispatcher} from 'svelte';

  export let value = false;

  const dispatch = createEventDispatcher();

  $: classes = 'toggle' + (value ? ' on' : '');
</script>

<button class={classes} on:click={() => dispatch('toggle')} type="button">
  <div class="thumb" />
</button>

<style>
  .thumb {
    --thumb-size: calc(var(--size) - (var(--padding) * 2));

    position: absolute;
    left: var(--padding);
    top: calc(var(--padding) - var(--border-width));

    height: var(--thumb-size);
    width: var(--thumb-size);

    background-color: var(--primary-color);
    border-radius: calc(var(--thumb-size) / 2);
    outline: none;

    transition-duration: 0.3s;
    transition-property: left;
  }

  .toggle {
    --padding: 2px;
    --size: 1.5rem;

    display: flex;
    align-items: center;

    background-color: var(--secondary-color);
    box-sizing: border-box;
    height: var(--size);
    width: calc(var(--size) * 1.8);
    border: none;
    border-radius: calc(var(--size) / 2);
    margin-bottom: 0;
    padding: var(--padding);
    position: relative;
  }

  .toggle:focus {
    outline: none;
  }

  .toggle.on .thumb {
    left: calc(var(--size) * 0.88);
  }
</style>
