import { server_user_auth } from "./api.js";
import { router } from "./router.js";

// Prevent default anchor behavior and use router()
export function prevent_a_from_click(){
  document.querySelectorAll('a').forEach((element) => {
      element.addEventListener('click', (e) => {
          e.preventDefault();
          const href = element.getAttribute('href');
          router(href);
      });
  });
}

export function setupHeaderEvents() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const dropdown = document.getElementById('mobileDropdown');
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');

  if (menuBtn && dropdown) {
    menuBtn.onclick = () => dropdown.classList.toggle('hidden');
    document.addEventListener('click', e => {
      if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  if (userBtn && userDropdown) {
    userBtn.onclick = () => userDropdown.classList.toggle('hidden');
    document.addEventListener('click', e => {
      if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.add('hidden');
      }
    });
  }
}


// Header Component with mobile dropdown toggle
export function header() {
    return /*html*/ `
      <!-- Floating Bouncing Button -->
      <div class="fixed bottom-0 right-0 m-6 mr-4 text-5xl z-[1000]">
        <a href='/meet' class="relative">
        <i class='bx bxs-badge-dollar bg-red-600 text-white p-2 m-4 block rounded-full animate-bounce'>
        <span class="rounded-full p-1 bg-yellow-400 text-[small] absolute top-[-20px] m-3 right-[-10px]">23</span></i></a>
      </div>
  
      <!-- Header -->
      <header class="bg-[crimson] p-2 py-3 sticky  top-0 shadow-md z-[1000]">
        <div class="mx-auto max-w-[1200px] w-full flex justify-between items-center">
  
          <div class="flex gap-5 items-center">
            <!-- Brand -->
            <h1 class="text-4xl text-white font-bold">
              X<small class="text-[medium]">_God</small>
            </h1>
  
            <!-- Navigation -->
            <nav class="flex gap-3 text-sm capitalize text-[whitesmoke] relative">
              <a href="/" class="sm:block hidden">home</a>
              <a href="/expose" class="sm:block hidden">expose</a>
              <a href="/massage" class="sm:block hidden">massage</a>
  
              <!-- Mobile Menu -->
              <div class="relative">
                <button id="mobileMenuBtn" class="text-xl sm:text-sm flex items-center gap-1">
                  <span class="sm:hidden">menu</span><span class="sm:inline hidden">more menu</span> <i class='bx bx-chevron-down'></i>
                </button>
                <div id="mobileDropdown" class="absolute left-0 mt-2 w-40 bg-white rounded shadow-md hidden z-50">
                  <a href="/" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">home</a>
                  <a href="/expose" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">expose</a>
                  <a href="/massage" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">massage</a>
                </div>
              </div>
            </nav>
          </div>
  
          <!-- User or Auth Icons -->
          <div class="flex items-center gap-3 text-white relative">
            <span href='javascript:;' onclick="const searchdiv=document.getElementById('searchDiv'); searchdiv.style.display= searchdiv.style.display == 'none' ? 'block' : 'none'"><i class='bx bxs-search-alt-2 bg-white text-[crimson] p-2 py-1 rounded-full text-xl'></i></span>
            <a href=''><i class='bx bxs-shopping-bags bg-white text-[crimson] p-2 py-1 rounded-full text-xl'></i></a>
  
              <button id="userBtn" class="text-white flex items-center gap-2">
                <i class='bx bxs-user-circle text-5xl'></i>
                <span class="capitalize hidden sm:inline"></span>
              </button>
              <div id="userDropdown" class="absolute right-0 top-[100%] mt-2 bg-white text-black w-40 rounded shadow-md hidden z-50">
                  <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
                  <a href="/settings" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
                  <a href="/login" class="block px-4 py-2 text-red-600 hover:bg-gray-100">Logout</a>
              </div>
          </div>
        </div>
      </header>
      <div id="searchDiv" style="display:none" class="p-2 bg-[#dddd] fixed top-[70px] z-[1000] w-full text-center">
      <input type="search" placeholder="search videos,products," class="w-full max-w-[1200px] mx-auto p-2 rounded border border-white text-white" />
      </div>
    `;
  }
  

// Footer Component
export function footer() {
  return /*html*/ `
    <footer class="bg-[#000b] py-3">
      <div class="mx-auto text-white flex justify-center max-w-[1200px] w-full">
        &copy; Copyright @ XGod.online
      </div>
    </footer>
  `;
}
