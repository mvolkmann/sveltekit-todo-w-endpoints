<script>
  import Icon from 'fa-svelte';
  import {createEventDispatcher} from 'svelte';
  import {fade} from 'svelte/transition';
  import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

  const dispatch = createEventDispatcher();

  export let todo; // the only prop
</script>

<!-- Making this a "local" transition avoids applying
     the transition when navigating to another page. -->
<li transition:fade|local>
  <input
    type="checkbox"
    checked={todo.done}
    on:change={() => dispatch('toggleDone')}
  />
  <span class={'done-' + todo.done}>{todo.text}</span>
  <button class="bare" on:click={() => dispatch('delete')}>
    <Icon icon={faTrashAlt} />
  </button>
</li>

<style>
  button {
    margin-left: 0.5rem;
    position: relative;
    top: 2px;
  }

  .done-true {
    color: var(--disabled-color);
    text-decoration: line-through;
  }

  li {
    display: flex;
    align-items: center;

    margin-top: 5px;
  }
</style>
