import {todos} from './_data.js';

export function put({body, params}) {
  const id = Number(params.id);
  const {text, done} = body;
  if (!text) return {body: 'missing text', status: 400};

  if (todos[id]) {
    todos[id] = {id, text, done};
    return {body: todos[id], status: 200};
  }
}

export function del({params}) {
  const {id} = params;
  if (todos[id]) {
    delete todos[id];
    return {body: '', status: 200};
  }
}
