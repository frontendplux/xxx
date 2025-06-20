import { router } from "./router.js";
export function prevent_a_from_click(){
    document.querySelectorAll('a').forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const href = element.getAttribute('href');
            router(href);
        });
    });
}

export function header(){
    return/*html*/`
    <header class="bg-[crimson] p-2 py-3 sticky top-0 z-9">
        <div class="mx-auto max-w-[1200px] w-full flex justify-between items-center">
            <h1 class="flex gap-5 text-4xl items-center text-white font-bold">XGod 
                <nav class="flex gap-3 text-sm capitalize text-[gold]">
                    <a href="">home</a>
                </nav>
            </h1>
            <div>
                <div><input type="search" placeholder="search" class="border text-white border-white px-3"></div>

            </div>
        </div>
    </header>
    `
}

export function footer(){
    return/*html*/`
    <footer class="bg-[#000b] py-3">
        <div class="mx-auto text-white flex justify-center max-w-[1200px] w-full">
            <div>
                &copy; copywright @ XGod.online
            </div>
        </div>
    </footer>
    `
}