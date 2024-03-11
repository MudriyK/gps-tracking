import { media } from "./media";

class WakeLockService {
  constructor() {
    this.isEnabled = false;
    this.hasNativeWakeLock = "wakeLock" in navigator;
    this._setup();
  }

  _setup() {
    if (this.hasNativeWakeLock) {
      document.addEventListener(
        "visibilitychange",
        this._handleVisibilityChange
      );
      document.addEventListener(
        "fullscreenchange",
        this._handleVisibilityChange
      );
    } else {
      this._noSleepVideo = document.createElement("video");
      this._noSleepVideo.setAttribute("playsinline", "");
      this._addVideoSources();
    }
  }

  _addVideoSources() {
    const addSource = (type, uri) => {
      const source = document.createElement("source");
      source.src = uri;
      source.type = `video/${type}`;
      this._noSleepVideo.appendChild(source);
    };

    addSource("webm", media.webm);
    addSource("mp4", media.mp4);

    this._noSleepVideo.loop = true;
  }

  _handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && this._wakeLock) {
      this.enableWakeLock();
    }
  };

  enableWakeLock = async () => {
    if (this.isEnabled) return;

    if (this.hasNativeWakeLock) {
      try {
        this._wakeLock = await navigator.wakeLock.request("screen");
        this.isEnabled = true;
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      this._noSleepVideo.play().catch(console.error);
      this.isEnabled = true;
    }
  };

  disableWakeLock = () => {
    if (!this.isEnabled) return;

    if (this.hasNativeWakeLock && this._wakeLock) {
      this._wakeLock.release();
      this._wakeLock = null;
    } else if (this._noSleepVideo) {
      this._noSleepVideo.pause();
    }

    this.isEnabled = false;
  };
}

export { WakeLockService };
