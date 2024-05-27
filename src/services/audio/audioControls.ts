import { setLocalStorage, LOCAL_STORAGE_KEY, readLocalStorage } from 'services/localStorage'
import { initAudioOffscreen } from './offscreenControls'

const Message = {
  PLAY_MUSIC: 'playMusic' as const,
  PAUSE_MUSIC: 'pauseMusic' as const,
  CHANGE_VOLUME: 'changeVolume' as const,
}

const AudioTrack = {
  BIRDS: 'audio/morning-birds.m4a' as const,
  CAMPFIRE: 'audio/campfire.m4a' as const,
  EXOTIC: 'audio/exotic-calm.m4a' as const,
  FOREST: 'audio/forest.m4a' as const,
  RAINY_MOUNTAINS: 'audio/rainy-mountains.m4a' as const,
  REAL_WIND: 'audio/real-wind.m4a' as const,
  STORMY_WIND: 'audio/stormy-wind.m4a' as const,
  WIND: 'audio/wind.m4a' as const,
}

type AudioTrack = (typeof AudioTrack)[keyof typeof AudioTrack]

/**
 *
 *
 */
async function getBackgroundAudioPlaying(): Promise<boolean> {
  const stringValue = await readLocalStorage(LOCAL_STORAGE_KEY.BACKGROUND_AUDIO_PLAYING)
  return stringValue === 'true'
}
/**
 *
 *
 */
async function getBackgroundAudioVolume(): Promise<number> {
  const stringValue = await readLocalStorage(LOCAL_STORAGE_KEY.BACKGROUND_AUDIO_VOLUME)
  const volume = stringValue ? Number(stringValue) : 1
  return volume
}

/**
 *
 *
 */
async function playBackgroundAudio(args: {
  track?: keyof typeof AudioTrack
  volume?: number
  responseCallback?: (playing: boolean) => void
}): Promise<void> {
  const { track, volume: propsVolume, responseCallback } = args

  await initAudioOffscreen()

  // TODO: If no track, select random track randomly.
  const url = track ? AudioTrack[track] : AudioTrack.BIRDS
  const volume = propsVolume ?? 1

  await chrome.runtime.sendMessage({ message: Message.PLAY_MUSIC, url, volume }, async response => {
    if (response.message === 'Playing audio element') {
      await setLocalStorage({ [LOCAL_STORAGE_KEY.BACKGROUND_AUDIO_PLAYING]: JSON.stringify(true) })
      responseCallback?.(true)
    }
  })
}

/**
 *
 *
 */
function pauseBackgroundAudio(args: { responseCallback?: (stopped: boolean) => void }) {
  const { responseCallback } = args

  // No need to remove the offscreen.
  // It automatically removes 30 seconds after the audio is paused.
  chrome.runtime.sendMessage({ message: 'pauseMusic' }, async response => {
    if (response.message === 'Audio element stopped') {
      await setLocalStorage({ [LOCAL_STORAGE_KEY.BACKGROUND_AUDIO_PLAYING]: JSON.stringify(false) })
      responseCallback?.(true)
    }
  })
}

/**
 *
 * @param volume
 *   1.0 is highest volume (100%. This is default)
 *   0.5 is half volume (50%)
 *   0.0 is silent (same as mute)
 */
function changeBackgroundAudioVolume(args: {
  volume: number
  responseCallback?: (changed: boolean) => void
}) {
  const { volume, responseCallback } = args

  chrome.runtime.sendMessage({ message: 'changeVolume', volume }, async response => {
    if (response.message === 'Audio volume changed') {
      await setLocalStorage({ [LOCAL_STORAGE_KEY.BACKGROUND_AUDIO_VOLUME]: JSON.stringify(volume) })
      responseCallback?.(true)
    }
  })
}

export { AudioTrack }
export {
  changeBackgroundAudioVolume,
  getBackgroundAudioPlaying,
  getBackgroundAudioVolume,
  pauseBackgroundAudio,
  playBackgroundAudio,
}
