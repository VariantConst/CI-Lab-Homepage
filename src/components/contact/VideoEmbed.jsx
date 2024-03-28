import React, { useState } from "react";

function VideoEmbed() {
  // 定义一个state来控制视频区域的显示与隐藏
  const [showVideo, setShowVideo] = useState(false);

  // 点击事件处理函数，用于切换视频显示状态
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="flex justify-center w-full md:w-4/5 lg:w-3/5 pb-8">
      {!showVideo ? (
        <div
          className="w-full md:w-4/5 rounded p-4 text-center mild cursor-pointer rounded-lg border-2 border-gray-300 dark:border-gray-500 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-400"
          onClick={toggleVideo}
        >
          Feel lost? See the interview with Prof. Boxin Shi.
          <span
            src="https://www.svgrepo.com/download/491102/pointer-pressed.svg"
            className="inline-block w-7 h-7 ml-2 align-middle mild animate-bounce"
            alt="Pointer Icon"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.60566 9.83622C8.20391 8.02832 10.2632 6.69256 11.7502 7.79654L18.8745 13.0858C20.2384 14.0984 19.7988 16.2427 18.1466 16.637L16.7718 16.9651L19.19 20.4274C19.5062 20.8802 19.3955 21.5036 18.9427 21.8198C18.49 22.1361 17.8665 22.0254 17.5503 21.5726L14.9995 17.9203L13.8791 19.1235C12.7816 20.3021 10.8124 19.7665 10.463 18.1944L8.60566 9.83622ZM17.6823 14.6916L10.558 9.40236L12.4154 17.7605L14.3791 15.6518L14.5849 15.4308L14.8788 15.3607L17.6823 14.6916Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M12.0678 6.08734L14.3457 4.4108M4.6643 11.5361L6.94229 9.85955"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M12.0678 6.08734L14.3457 4.4108M4.6643 11.5361L6.94229 9.85955"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M3.99958 5.56264L6.5905 6.69716"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M8.84035 1.99999L9.15328 4.81105"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      ) : (
        <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800">
          <iframe
            src="//player.bilibili.com/player.html?aid=1952417839&bvid=BV17C411b7Xw&cid=1484053748&p=1&as_wide=1&high_quality=1&danmaku=0"
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen={true}
            style={{ border: 0 }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default VideoEmbed;
