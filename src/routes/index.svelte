<script context="module">
  import {getJson} from '$lib/fetch-util';
  const URL_PREFIX = 'http://localhost:3000/todo';

  import '../global.css';

  // Since the load function is async, it returns a promise.
  // This component won't be rendered until the promise resolves.
  export async function load({fetch}) {
    // Don't need try/catch when there is an error page.
    const todos = await getJson(fetch);
    // The props returned are passed to the component defined below.
    return {props: {todos}};
  }
</script>

<script>
  import {deleteResource, postJson, putJson} from '$lib/fetch-util';
  import Todo from '$lib/Todo.svelte';

  export let todos = {};

  let error = '';
  let todoText = '';

  $: sortedTodos = Object.values(todos).sort((t1, t2) =>
    t1.text.localeCompare(t2.text)
  );

  $: uncompletedCount = sortedTodos.filter(t => !t.done).length;
  $: status = `${uncompletedCount} of ${sortedTodos.length} remaining`;

  async function archive() {
    const todosDone = Object.values(todos).filter(t => t.done);
    try {
      const promises = todosDone.map(t => deleteResource(t.id, fetch));
      await Promise.all(promises);
      for (const todo of todosDone) {
        delete todos[todo.id];
      }
      todos = todos; // trigger reactivity
    } catch (e) {
      error = 'Error archiving todo: ' + e.message;
    }
  }

  async function create() {
    try {
      const todo = await postJson(todoText, fetch);
      todos[todo.id] = todo;
      todos = todos; // trigger reactivity
      todoText = '';
      error = '';
    } catch (e) {
      error = 'Error creating todo: ' + e.message;
    }
  }

  async function del(id) {
    try {
      await deleteResource(id, fetch);
      delete todos[id];
      todos = todos; // trigger reactivity
      error = '';
    } catch (e) {
      error = 'Error deleting todo: ' + e.message;
    }
  }

  async function toggle(todo) {
    todo.done = !todo.done;
    try {
      const newTodo = await putJson(todo, fetch);
      todos[todo.id] = newTodo;
      todos = todos; // trigger reactivity
      error = '';
    } catch (e) {
      error = 'Error toggling todo: ' + e.message;
    }
  }
</script>

<section>
  <h2>To Do List</h2>
  <div>
    {status}
    <button on:click={archive}>Archive Completed</button>
  </div>
  <div class="error">{error}</div>
  <form on:submit|preventDefault>
    <input
      type="text"
      size="30"
      autofocus
      placeholder="enter new todo here"
      bind:value={todoText}
    />
    <button disabled={!todoText} on:click={create}> Add </button>
  </form>
  <ul class="unstyled">
    {#each sortedTodos as todo}
      <Todo
        {todo}
        on:delete={() => del(todo.id)}
        on:toggleDone={() => toggle(todo)}
      />
    {/each}
  </ul>
</section>

<style>
  button {
    margin-left: 10px;
  }

  .error {
    color: red;
  }

  form {
    margin-top: 1rem;
  }

  h2 {
    margin-top: 0;
  }

  section {
    padding: 1rem;
  }

  /* This removes bullets from a bulleted list. */
  ul.unstyled {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
</style>
