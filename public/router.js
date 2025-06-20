import { prevent_a_from_click } from "./waget.js";
import home from "./home.js";

export const router = async (path) => {
  const currentPath = localStorage.getItem('url');

  if (currentPath !== path) {
    history.pushState({ url: path }, '', path);
    localStorage.setItem('url', path);
  } else {
    history.replaceState({ url: path }, '', path);
  }

  const content = await loadPages(path); // ⬅️ FIXED HERE

  document.getElementById('root').innerHTML = content || `<h2>404 - Page Not Found</h2>`;
  prevent_a_from_click();
};

async function loadPages(path) {
  console.log('Navigating to:', path);
  switch (path) {
    case '/xxx/':
      return await home(); // ⬅️ This is async
      break;

    default:
      return null;
  }
}
