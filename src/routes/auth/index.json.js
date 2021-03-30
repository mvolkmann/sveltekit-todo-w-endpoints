export function post({body}) {
  const {email, password} = body;
  console.log('auth/index.json.js post: email =', email);
  console.log('auth/index.json.js post: password =', password);

  let token = '';
  const correct = password === 'secret';
  if (correct) token = 'some-token';
  return {body: token, status: correct ? 200 : 401};
}
