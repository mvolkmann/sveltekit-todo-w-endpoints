<script context="module">
  const URL_PREFIX = 'http://localhost:3000/todo';

  export async function load({fetch}) {
    try {
      const res = await fetch(URL_PREFIX);
      if (!res.ok) throw new Error(await res.text());
      const todos = await res.json();
      return {props: {todos}};
      error = '';
    } catch (e) {
      error = 'Error loading todos: ' + e.message;
    }
  }
</script>

<script>
  import Todo from '../lib/Todo.svelte';

  export let todos = {};

  const headers = {'Content-Type': 'application/json'};

  let error = '';
  let todoText = '';

  $: sortedTodos = Object.values(todos).sort((t1, t2) =>
    t1.text.localeCompare(t2.text)
  );

  /*
  let todos = [
    createTodo('learn Svelte', true),
    createTodo('build a Svelte app')
  ];
  */

  $: uncompletedCount = sortedTodos.filter(t => !t.done).length;
  $: status = `${uncompletedCount} of ${sortedTodos.length} remaining`;

  async function archiveCompleted() {
    try {
      for (const todo of sortedTodos) {
        if (todo.done) await deleteTodo(todo.id);
      }
    } catch (e) {
      error = 'Error archiving todo: ' + e.message;
    }
  }

  async function createTodo() {
    try {
      const res = await fetch(URL_PREFIX, {
        method: 'POST',
        headers,
        body: JSON.stringify({text: todoText})
      });
      if (!res.ok) throw new Error(await res.text());
      const todo = await res.json();
      todos[todo.id] = todo;
      todoText = '';
      error = '';
    } catch (e) {
      error = 'Error creating todo: ' + e.message;
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await fetch(URL_PREFIX + '/' + id, {method: 'DELETE'});
      if (!res.ok) throw new Error(await res.text());
      delete todos[id];
      todos = todos; // trigger reactivity
      error = '';
    } catch (e) {
      error = 'Error deleting todo: ' + e.message;
    }
  }

  async function toggleDone(todo) {
    todo.done = !todo.done;
    updateTodo(todo);
  }

  async function updateTodo(todo) {
    const {id} = todo;
    try {
      const res = await fetch(URL_PREFIX + '/' + id, {
        method: 'PUT',
        headers,
        body: JSON.stringify(todo)
      });
      if (!res.ok) throw new Error(await res.text());
      todos[id] = await res.json();
      error = '';
    } catch (e) {
      error = 'Error updating todo: ' + e.message;
    }
  }
</script>

<div>
  <h2>To Do List</h2>
  <div>
    {status}
    <button on:click={archiveCompleted}>Archive Completed</button>
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
</div>

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

  /* This removes bullets from a bulleted list. */
  ul.unstyled {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
</style>
