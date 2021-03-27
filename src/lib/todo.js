// Even though console and Promise are reported as "not defined"
// this code still works.
// See https://github.com/sveltejs/language-tools/issues/918.

const URL_PREFIX = 'http://localhost:3000/todo';
const headers = {'Content-Type': 'application/json'};

export async function archiveTodos(todos, fetch) {
  const promises = Object.values(todos)
    .filter(t => t.done)
    .map(t => deleteTodo(t.id, todos, fetch));
  return Promise.all(promises);
}

export async function createTodo(text, todos, fetch) {
  const res = await fetch(URL_PREFIX + '.json', {
    method: 'POST',
    headers,
    body: JSON.stringify({text})
  });
  if (!res.ok) throw new Error(await res.text());
  const todo = await res.json();
  todos[todo.id] = todo;
}

export async function deleteTodo(id, todos, fetch) {
  const res = await fetch(`${URL_PREFIX}/${id}.json`, {method: 'DELETE'});
  if (!res.ok) throw new Error(await res.text());
  delete todos[id];
}

export async function getTodos(fetch) {
  const res = await fetch(URL_PREFIX + '.json');
  if (!res.ok) {
    const text = await res.text();
    throw new Error('error getting todos: ' + text);
  }
  return res.json();
}

export async function updateTodo(todo, todos, fetch) {
  const {id} = todo;
  const res = await fetch(`${URL_PREFIX}/${id}.json`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(todo)
  });
  if (!res.ok) throw new Error(await res.text());
  todos[id] = await res.json();
}
