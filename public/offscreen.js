let audioElement = null;

const Message = {
  PLAY_MUSIC: 'playMusic',
  PAUSE_MUSIC: 'pauseMusic',
  CHANGE_VOLUME: 'changeVolume',
}

/**
 * Function to fade in the audio
 */
function fadeIn(audioElement, duration, targetVolume) {
  audioElement.volume = 0;
  audioElement.play();
  const step = 0.01;
  const interval = duration / (targetVolume / step);
  const fadeAudio = setInterval(() => {
    if (audioElement.volume < targetVolume) {
      audioElement.volume = Math.min(audioElement.volume + step, targetVolume);
    } else {
      clearInterval(fadeAudio);
    }
  }, interval);
}

/**
 * Function to fade out the audio
 */
function fadeOut(audioElement, duration) {
  const step = 0.01;
  const interval = duration / (1 / step);
  const fadeAudio = setInterval(() => {
    if (audioElement.volume > 0) {
      audioElement.volume = Math.max(audioElement.volume - step, 0);
    } else {
      clearInterval(fadeAudio);
      audioElement.pause();
    }
  }, interval);
}

/**
 * 
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.message === Message.PLAY_MUSIC) {
    if (!audioElement) {
      audioElement = new Audio(request.url);
      audioElement.loop = true; 
    }
    fadeIn(audioElement, 1000, request.volume);
    sendResponse({ message: 'Playing audio element' })

  } else if (request.message === Message.PAUSE_MUSIC) {
    if (audioElement) {
      fadeOut(audioElement, 400);
      sendResponse({ message: 'Audio element stopped' })
    }

  } else if (request.message === Message.CHANGE_VOLUME) {
    if (audioElement) {
      audioElement.volume = request.volume;
      sendResponse({ message: 'Audio volume changed' })
    }
  }
});