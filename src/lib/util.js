export function getBrowser() {
  // Note that navigator is defined in the browser, but not on the server.
  const agent = navigator.userAgent;

  // The order matters here.
  if (agent.includes('Firefox')) return 'Firefox';
  if (agent.includes('Trident')) return 'Internet Explorer';
  if (agent.includes('Edge')) return ' Edge';
  if (agent.includes('Chrome')) return 'Chrome';
  if (agent.includes('Safari')) return 'Safari';
  return 'unknown';
}
