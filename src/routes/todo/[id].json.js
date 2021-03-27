// Adding ".json" in this file name is for consistency with "index.json.js".
// See the comment at the top of that file.
import {todos} from './_data.js';

export function put({body, params}) {
  const id = Number(params.id);
  const {text, done} = body;
  if (!text) return {body: 'missing text', status: 400};

  if (todos[id]) {
    todos[id] = {id, text, done};
    // If the body is an object and no "Content-Type" header is specified,
    // the body is automatically converted to a JSON string
    // and the "Content-Type" is set to "application/json".
    return {body: todos[id], status: 200};
  }
  // Returning nothing is the same as returning a 404 status.
}

export function del({params}) {
  const {id} = params;
  if (todos[id]) {
    delete todos[id];
    // A body must be specified, but it can be an empty string.
    return {body: '', status: 200};
  }
  // Returning nothing is the same as returning a 404 status.
}
