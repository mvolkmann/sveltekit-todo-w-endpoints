<script>
  import {createEventDispatcher} from 'svelte';
  //import {fade} from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let todo; // the only prop
</script>

<!-- Having a transition here delays the
     rendering of other routes like "About". -->
<!-- <li transition:fade> -->
<li>
  <input
    type="checkbox"
    checked={todo.done}
    on:change={() => dispatch('toggleDone')}
  />
  <span class={'done-' + todo.done}>{todo.text}</span>
  <button on:click={() => dispatch('delete')}>🗑</button>
</li>

<style>
  button {
    background-color: transparent;
    border: none;
  }

  .done-true {
    color: gray;
    text-decoration: line-through;
  }

  li {
    margin-top: 5px;
  }
</style>
