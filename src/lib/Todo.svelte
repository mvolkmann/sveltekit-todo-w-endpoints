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
  <button class="bare" on:click={() => dispatch('delete')}>🗑</button>
</li>

<style>
  button {
    margin-left: 1rem;
  }

  .done-true {
    color: gray;
    text-decoration: line-through;
  }

  li {
    display: flex;
    align-items: center;

    margin-top: 5px;
  }
</style>
