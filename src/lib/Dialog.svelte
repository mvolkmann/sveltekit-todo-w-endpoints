<script>
  /**
   * Creates a Dialog that can have a title and any content.
   * A ref must be passed via the `dialog` prop.
   * This is used by the caller to open and close the dialog.
   * The dialog is initially closed.
   *
   * To open the dialog as a modal, `dialog.showModal()`.
   * This does not allow interaction with elements outside the dialog.
   *
   * To open the dialog as a non-modal, `dialog.show()`.
   * This allows interaction with elements outside the dialog.
   *
   * To close the dialog, `dialog.close()`.
   *
   * @param {boolean} canClose - boolean that determines whether
   *   a close "X" should appear (defaults to true)
   * @param {string} className - CSS class name to apply to dialog element
   * @param {string} title - to display in the dialog header
   */

  import {createEventDispatcher, onMount} from 'svelte';

  export let canClose = true;
  export let className = '';
  export let dialog = null;
  export let title;

  const dispatch = createEventDispatcher();

  const classNames = 'dialog' + (className ? ' ' + className : '');

  onMount(async () => {
    // Using a dynamic import inside onMount guarantees
    // that it will only be imported on the client side.
    // This is important for dialog-polyfill because it accesses
    // the window object is not defined on the server side.
    const module = await import('dialog-polyfill');
    module.default.registerDialog(dialog);
  });

  function close() {
    dispatch(close);
    dialog.close();
  }
</script>

<dialog bind:this={dialog} class={classNames}>
  {#if title}
    <header>
      <div class="title">{title}</div>
      {#if canClose}
        <button class="bare" on:click={close}>✖</button>
      {/if}
    </header>
  {/if}
  <section class="body">
    <slot />
  </section>
</dialog>

<style>
  .body {
    padding: 1rem;
  }

  .body :global(.buttons) {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 1rem;
  }

  dialog {
    /* These properties center the dialog in the browser window. */
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);

    border: none;
    box-shadow: 0 0 0.625rem darkgray;
    padding: 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--secondary-color);
    box-sizing: border-box;
    color: var(--bg-color);
    font-weight: bold;
    padding: 1rem;
    width: 100%;
  }

  .title {
    color: var(--input-bg-color);
    flex-grow: 1;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }

  dialog::backdrop, /* for native <dialog> */
  :global(dialog + .backdrop) /* for dialog-polyfill */ {
    /* a transparent shade of gray */
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
