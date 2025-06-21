import { header } from "./waget.js";

export default function uploadpost() {
  const uploadData = {
    title: '',
    video: '',
    image: '',
    length: ''
  };

  // Update title preview and save
  window.updateTitle = function (val) {
    uploadData.title = val;
    document.getElementById('titlePreview').textContent = val;
  };

  // Handle file input (video or image)
  window.get_file = function (file, type) {
    const fr = new FileReader();
    fr.onload = e => {
      if (type === 2) {
        // Image
        uploadData.image = e.target.result;
        document.getElementById('videoPreview').poster = uploadData.image;
      } else {
        // Video
        uploadData.video = e.target.result;
        const videoEl = document.getElementById('videoPreview');
        videoEl.src = uploadData.video;
        videoEl.load();

        // Get video duration
        videoEl.onloadedmetadata = () => {
          const durationInSeconds = videoEl.duration;
          uploadData.length = durationInSeconds;

          // Format duration to MM:SS
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = Math.floor(durationInSeconds % 60);
          const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

          document.getElementById('videoLength').textContent =
            `Duration: ${formatted} (${durationInSeconds.toFixed(2)} seconds)`;
            uploadData.length = formatted;
          console.log("Video duration:", formatted, "| Raw seconds:", durationInSeconds);
        };
      }
      console.log(uploadData);
    };
    fr.readAsDataURL(file);
  };

  // Upload post to server
  window.uploadpostdata = async () => {
    document.getElementById('loading').style.display = 'flex';

    const reg = await fetch('server/upload', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData)
    }).then(res => res.text());

    document.getElementById('loading').style.display = 'none';
    console.log(reg);
  };

  // Render HTML
  return /*html*/ `
    <div id="loading" class="text-4xl z-[40]" style="position: fixed; display: none; justify-content: center; align-items: center; z-index: 1000; top: 0; bottom: 0; right: 0; left: 0; background: #fff2;">
      <span>loading...</span>
    </div>

    ${header()}

    <div class="p-3">
      <div class="flex gap-3">
        <div class="w-[40%]">
          <video id="videoPreview" controls class="w-full" poster="">
            Your browser does not support the video tag.
          </video>
          <div id="videoLength" class="text-sm text-gray-600 mt-1"></div>
        </div>
        <div>
          <div id="titlePreview" class="text-lg font-bold">No Title</div>
        </div>
      </div>

      <div class="my-2">
        <textarea
          cols="30"
          rows="2"
          placeholder="Enter title"
          oninput="updateTitle(this.value)"
        ></textarea>
      </div>

      <div class="my-2">
        Video: <input type="file" accept="video/*" onchange="get_file(this.files[0], 1)" />
      </div>

      <div class="my-2">
        Image: <input type="file" accept="image/*" onchange="get_file(this.files[0], 2)" />
      </div>

      <div><button onclick="uploadpostdata()">Upload</button></div>
    </div>
  `;
}
