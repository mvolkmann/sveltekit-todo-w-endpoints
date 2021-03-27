<script context="module">
  import {getJson, setFetch} from '$lib/fetch-util';

  // Since the load function is async, it returns a promise.
  // This component won't be rendered until the promise resolves.
  export async function load({fetch}) {
    setFetch(fetch);

    // Don't need try/catch when there is an error page.
    const todos = await getJson(fetch);
    // The props returned are passed to the component defined below.
    return {props: {todos}};
  }
</script>

<script>
  import {onMount} from 'svelte';

  import {deleteResource, postJson, putJson} from '$lib/fetch-util';
  import {darkModeStore} from '$lib/stores';
  import Todo from '$lib/Todo.svelte';
  import '../global.css';

  export let todos = {};

  let error = '';
  let todoText = '';

  onMount(() => {
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode) {
      // Convert from string to boolean.
      darkMode = darkMode === 'true';
    } else {
      // Get from system preferences.
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (darkMode) document.body.classList.add('dark-mode');
    $darkModeStore = darkMode;
  });

  $: sortedTodos = Object.values(todos).sort((t1, t2) =>
    t1.text.localeCompare(t2.text)
  );

  $: uncompletedCount = sortedTodos.filter(t => !t.done).length;

  $: status = `${uncompletedCount} of ${sortedTodos.length} remaining`;

  // In this simple version of the app,
  // archiving todos just deletes them.
  async function archiveTodos() {
    const todosDone = Object.values(todos).filter(t => t.done);
    try {
      const promises = todosDone.map(t => deleteResource(t.id));
      // Wait for all the deletes to complete on the server.
      await Promise.all(promises);
      for (const todo of todosDone) {
        delete todos[todo.id];
      }
      success();
    } catch (e) {
      error = 'Error archiving todos: ' + e.message;
    }
  }

  async function createTodo() {
    try {
      const todo = await postJson(todoText);
      todos[todo.id] = todo;
      success();
      todoText = '';
    } catch (e) {
      error = 'Error creating todo: ' + e.message;
    }
  }

  async function deleteTodo(id) {
    try {
      await deleteResource(id);
      delete todos[id];
      success();
    } catch (e) {
      error = 'Error deleting todo: ' + e.message;
    }
  }

  function success() {
    todos = todos; // trigger reactivity
    error = '';
  }

  async function toggleDone(todo) {
    todo.done = !todo.done;
    try {
      todos[todo.id] = await putJson(todo);
      success();
    } catch (e) {
      error = 'Error toggling todo: ' + e.message;
    }
  }
</script>

<section>
  <h2>To Do List</h2>
  <div>
    {status}
    <button
      disabled={uncompletedCount === sortedTodos.length}
      on:click={archiveTodos}>Archive Completed</button
    >
  </div>
  <div class="error">{error}</div>
  <form on:submit|preventDefault>
    <!--TODO: Why is using autofocus considered so bad? -->
    <input
      type="text"
      size="30"
      autofocus
      placeholder="enter new todo here"
      bind:value={todoText}
    />
    <button disabled={!todoText} on:click={createTodo}> Add </button>
  </form>
  <ul class="unstyled">
    {#each sortedTodos as todo}
      <Todo
        {todo}
        on:delete={() => deleteTodo(todo.id)}
        on:toggleDone={() => toggleDone(todo)}
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
