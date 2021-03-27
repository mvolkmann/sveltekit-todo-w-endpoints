// Adding ".json" in this file name avoids
// conflicting with a page route named "todo".
import {todos} from './_data.js';

let lastId = 0;

function addTodo(text, done = false) {
  const id = ++lastId;
  todos[id] = {id, text, done};
  return id;
}

addTodo('learn Svelte', true);
addTodo('buy milk');

export function get() {
  return {body: todos};
}

export function post({body}) {
  const {done, text} = body;
  if (!text) return {body: 'missing text', status: 400};
  if (typeof text !== 'string') {
    return {body: 'invalid text type', status: 400};
  }

  const id = addTodo(text, done);
  return {body: todos[id], status: 201};
}
