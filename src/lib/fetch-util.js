const URL_PREFIX = 'http://localhost:3000/';
const headers = {'Content-Type': 'application/json'};

//TODO: Why does fetch need to be passed in?
let fetch;
export const setFetch = fn => (fetch = fn);

export async function deleteResource(id) {
  const res = await fetch(`${URL_PREFIX}/${id}.json`, {method: 'DELETE'});
  if (!res.ok) throw new Error(await res.text());
}

export async function getJson(path) {
  const res = await fetch(URL_PREFIX + path + '.json');
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function getResponse(res) {
  const contentType = res.headers.get('Content-Type');
  return contentType === 'application/json' ? res.json() : res.text();
}

export async function postJson(path, body) {
  const res = await fetch(URL_PREFIX + path + '.json', {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return getResponse(res);
}

export async function postText(path, text) {
  const res = await fetch(URL_PREFIX + path + '.json', {
    method: 'POST',
    headers,
    body: text
  });
  if (!res.ok) throw new Error(await res.text());
  return getResponse(res);
}

export async function putJson(path, todo) {
  const {id} = todo;
  const res = await fetch(`${URL_PREFIX}/${path}/${id}.json`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(todo)
  });
  if (!res.ok) throw new Error(await res.text());
  return getResponse(res);
}
