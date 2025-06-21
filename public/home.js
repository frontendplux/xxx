import { footer, header } from "./waget.js";
import { fetch_post } from "./api.js";

export default async function home() {
    // Fetch first and second batches
    const firstBatch = await fetch_post(0, 4);
    const secondBatch = await fetch_post(4, 8);

    // Function to render video HTML
    const renderVideos = (data) => {
        return data.map(element => {
        // console.log(element.image);
            return `
                <div class="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 p-1">
                    <div class="relative">
                        <img src="server/myfile/${element.image}" class="w-full h-[200px] object-cover object-center" alt="" loading="lazy"> 
                        <span class="absolute right-0 bottom-0 bg-[#000b] m-3 px-2 text-white">${element.duration}</span>
                    </div>
                    <div class="font-semibold my-1 line-clamp-2">${element.title}</div>
                    <!--<div class="flex gap-3 items-center text-sm text-gray-600">
                        <span><i class='bx bx-heart'></i> ${element.like}</span> |
                        <span><i class='bx bx-message-rounded-dots'></i> ${element.comment}</span>
                    </div>-->
                </div>
            `;
        }).join("");
    };

    return /*html*/`
    ${await header()}  <!-- ✅ Await header since it returns a Promise -->

    <!-- First Batch -->
    <div class="max-w-[1200px] flex flex-wrap w-full mx-auto my-8">
        ${renderVideos(firstBatch)}
    </div>

    <!-- Middle Ad Banner -->
    <div class="flex justify-center my-7">
        <img src="videoPic.webp" class="w-[700px] h-[100px]" alt=""> 
    </div>

    <!-- Second Batch -->
    <div class="max-w-[1200px] flex flex-wrap w-full mx-auto">
        ${renderVideos(secondBatch)}
    </div>

    ${footer()} <!-- ✅ If footer() is synchronous, no need to await -->
`;

}
