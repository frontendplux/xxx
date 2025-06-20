import { router } from "./public/router.js";
import { prevent_a_from_click } from "./public/waget.js";
prevent_a_from_click();
window.addEventListener('DOMContentLoaded', () => {
    router(window.location.pathname);
});