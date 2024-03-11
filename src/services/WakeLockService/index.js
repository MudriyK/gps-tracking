import { media } from "./media";

class WakeLockService {
  constructor() {
    this._isEnabled = false;
    this._wakeLock = null;
    this._noSleepVideo = null;
    this._hasNativeWakeLock = "wakeLock" in navigator;

    this._setupFallbackWakeLock();
  }

  async _setupFallbackWakeLock() {
    if (!this._hasNativeWakeLock) {
      // Set up no sleep video element
      this._noSleepVideo = document.createElement("video");

      this._noSleepVideo.setAttribute("title", "No Sleep");
      this._noSleepVideo.setAttribute("playsinline", "");

      this._addSourceToVideo(this._noSleepVideo, "webm", media.webm);
      this._addSourceToVideo(this._noSleepVideo, "mp4", media.mp4);

      this._noSleepVideo.addEventListener("loadedmetadata", () => {
        if (this._noSleepVideo.duration <= 1) {
          // webm source
          this._noSleepVideo.setAttribute("loop", "");
        } else {
          // mp4 source
          this._noSleepVideo.addEventListener("timeupdate", () => {
            if (this._noSleepVideo.currentTime > 0.5) {
              this._noSleepVideo.currentTime = Math.random();
            }
          });
        }
      });
    }
  }

  _addSourceToVideo(element, type, dataURI) {
    const source = document.createElement("source");
    source.src = dataURI;
    source.type = `video/${type}`;
    element.appendChild(source);
  }

  async enableWakeLock() {
    if (this._isEnabled) return;

    try {
      if (this._hasNativeWakeLock) {
        this._wakeLock = await navigator["wakeLock"].request("screen");
        this._isEnabled = true;
      } else {
        await this._noSleepVideo.play();
        this._isEnabled = true;
      }

      console.log("WakeLock enabled");
    } catch (err) {
      this._isEnabled = false;

      console.error(`${err.name}, ${err.message}`);
    }
  };

  async disableWakeLock() {
    if (this._hasNativeWakeLock) {
      if (this._wakeLock) {
        await this._wakeLock.release();
      }
      this._wakeLock = null;
    } else {
      await this._noSleepVideo.pause();
    }

    console.log("WakeLock disabled");
    this._isEnabled = false;
  }
}

export { WakeLockService };
