const URL_PREFIX = 'http://localhost:3000/todo';
const headers = {'Content-Type': 'application/json'};

//TODO: Why does fetch need to be passed to these functions?
//TODO: Is it because they may be run on the server where it isn't defined?

export async function deleteResource(id, fetch) {
  const res = await fetch(`${URL_PREFIX}/${id}.json`, {method: 'DELETE'});
  if (!res.ok) throw new Error(await res.text());
}

export async function getJson(fetch) {
  const res = await fetch(URL_PREFIX + '.json');
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function postJson(text, fetch) {
  const res = await fetch(URL_PREFIX + '.json', {
    method: 'POST',
    headers,
    body: JSON.stringify({text})
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function putJson(todo, fetch) {
  const {id} = todo;
  const res = await fetch(`${URL_PREFIX}/${id}.json`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(todo)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
