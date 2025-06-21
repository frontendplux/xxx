import { prevent_a_from_click, setupHeaderEvents } from "./waget.js";
import home from "./home.js";
import uploadpost from "./upload.js";
import login from "./login-signup-confirm-pass-forget-pass-confirm-forget-pass.js";

export const router = async (path) => {
  const currentPath = localStorage.getItem('url');

  if (currentPath !== path) {
    history.pushState({ url: path }, '', '/xxx'+path);
    localStorage.setItem('url', path);
  } else {
    history.replaceState({ url: path }, '', '/xxx'+path);
  }

  const content = await loadPages(path); // Load the page content
  document.getElementById('root').innerHTML = content || `<h2>404 - Page Not Found</h2>`;
  setupHeaderEvents();
  prevent_a_from_click(); // Re-bind link intercepts
};
export function getCleanPath() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return '/' + path.split('/').slice(1).join('/');
}


// Page loader
async function loadPages(path) {
  switch (path) {
    case '/':
      return await home();
      break;

    case '/login':
      return await login();
      break;

    case '/upload':
      return await uploadpost();
      break;

    default:
      return null;
      break;
}
}