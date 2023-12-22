if (location.host === "www.youtube.com") {
  let video;
  function sideview() {
    const tops = document.querySelector("ytd-watch-metadata");
    const player = document.querySelector(".html5-video-player");
    const bar = document.querySelector("#movie_player > div.ytp-chrome-bottom")
    let originalWidth = video.clientWidth;
    let originalHeight = video.clientHeight;
    window.addEventListener("resize", function() {
      originalWidth = player.clientWidth;
      originalHeight = player.clientHeight;
    });
    window.addEventListener("scroll", function() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const topsOffset = tops.clientHeight;
      if (scrollPosition > innerHeight - topsOffset) {
        video.style.position = "fixed";
        video.style.top = "56px";
        video.style.left = "1px";
        video.style.zIndex = "1003";
        video.style.height = `${Math.floor(originalHeight * 0.5)}px`;
        video.style.width = `${Math.floor(originalWidth * 0.5)}px`;
        bar.style.position = "fixed";
        bar.style.scale = "0.5"
        bar.style.left = `-${Math.floor(originalWidth * 0.5 / 2) - 15}px`;
        bar.style.top = `${Math.floor(originalHeight * 0.5) + 18}px`;
        bar.style.background = "rgb(0,0,0,0.2)"
        player.style.position = "unset";
      } else {
        video.style.position = "absolute";
        video.style.top = "0";
        video.style.left = "0";
        video.style.zIndex = "0";
        video.style.height = "auto";
        video.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.scale = "1"
        bar.style.left = "12px"
        bar.style.top = "unset"
        bar.style.background = "unset"
        player.style.position = "relative";
      }
    });
  }
  function waitVideoLoad() {
    (location.pathname === "/watch" && document.readyState === "complete") ?
    (video = document.querySelector('video.html5-main-video')) ? sideview() :
    ((retry < MAX_RETRY) ? (retry++, setTimeout(waitVideoLoad, 500)) : null) : setTimeout(waitVideoLoad, 1000);
  }
  waitVideoLoad();
}
