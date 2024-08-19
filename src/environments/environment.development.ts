export const environment = {
  production: true,
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api'
      : 'https://chat-application-kgyf.vercel.app/api',
  socketUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : 'https://chat-application-kgyf.vercel.app',
};
