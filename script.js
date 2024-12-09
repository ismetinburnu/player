document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.querySelector('.video-player-container');
  const videoElement = videoContainer.querySelector('.video-element');
  const playPauseBtn = videoContainer.querySelector('.play-pause-btn i');
  const progressBar = videoContainer.querySelector('.progress-bar');
  const volumeControl = videoContainer.querySelector('.volume-control');
  const muteBtn = videoContainer.querySelector('.mute-btn i');
  const fileName = videoContainer.querySelector('.file-name');
  
  let isPlaying = false;
  let isMuted = false;

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      videoElement.pause();
      playPauseBtn.classList.remove('fa-pause');
      playPauseBtn.classList.add('fa-play');
    } else {
      videoElement.play();
      playPauseBtn.classList.remove('fa-play');
      playPauseBtn.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
  });

  volumeControl.addEventListener('input', (e) => {
    videoElement.volume = e.target.value / 100;
  });

  muteBtn.addEventListener('click', () => {
    if (isMuted) {
      videoElement.muted = false;
      muteBtn.classList.remove('fa-volume-mute');
      muteBtn.classList.add('fa-volume-up');
    } else {
      videoElement.muted = true;
      muteBtn.classList.remove('fa-volume-up');
      muteBtn.classList.add('fa-volume-mute');
    }
    isMuted = !isMuted;
  });

  videoElement.addEventListener('timeupdate', () => {
    const value = (videoElement.currentTime / videoElement.duration) * 100;
    progressBar.value = value;
  });

  progressBar.addEventListener('input', (e) => {
    const seekTime = (e.target.value / 100) * videoElement.duration;
    videoElement.currentTime = seekTime;
  });

  videoElement.addEventListener('loadedmetadata', () => {
    const fileNameWithoutExt = videoElement.src.split('/').pop().replace(/\.[^/.]+$/, "");
    fileName.textContent = fileNameWithoutExt;
  });
});