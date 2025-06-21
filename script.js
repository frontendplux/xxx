import { getCleanPath, router } from "./public/router.js";
import { prevent_a_from_click } from "./public/waget.js";
window.addEventListener('DOMContentLoaded', () => {
  const path = getCleanPath();
  router(path || '/home');
});
window.onpopstate = (e) => {
    router(e.state.url);
  };
prevent_a_from_click();