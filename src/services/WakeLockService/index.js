import { media } from "./media";

// class WakeLockService {
//   constructor() {
//     this.isEnabled = false;
//     this.hasNativeWakeLock = "wakeLock" in navigator;
//     this._setup();
//   }
//
//   _setup() {
//     if (this.hasNativeWakeLock) {
//       document.addEventListener(
//         "visibilitychange",
//         this._handleVisibilityChange
//       );
//       document.addEventListener(
//         "fullscreenchange",
//         this._handleVisibilityChange
//       );
//     } else {
//       this._noSleepVideo = document.createElement("video");
//       this._noSleepVideo.setAttribute("playsinline", "");
//       this._addVideoSources();
//     }
//   }
//
//   _addVideoSources() {
//     const addSource = (type, uri) => {
//       const source = document.createElement("source");
//       source.src = uri;
//       source.type = `video/${type}`;
//       this._noSleepVideo.appendChild(source);
//     };
//
//     addSource("webm", media.webm);
//     addSource("mp4", media.mp4);
//
//     this._noSleepVideo.loop = true;
//   }
//
//   _handleVisibilityChange = () => {
//     if (document.visibilityState === "visible" && this._wakeLock) {
//       this.enableWakeLock();
//     }
//   };
//
//   enableWakeLock = async () => {
//     if (this.isEnabled) return;
//
//     if (this.hasNativeWakeLock) {
//       try {
//         alert('Native wakelock enabled');
//         this._wakeLock = await navigator.wakeLock.request("screen");
//         this.isEnabled = true;
//       } catch (err) {
//         console.error(`${err.name}, ${err.message}`);
//       }
//     } else {
//       alert('Fallback wakelock enabled');
//       this._noSleepVideo.play().catch(console.error);
//       this.isEnabled = true;
//     }
//   };
//
//   disableWakeLock = () => {
//     if (!this.isEnabled) return;
//
//     if (this.hasNativeWakeLock && this._wakeLock) {
//       this._wakeLock.release();
//       this._wakeLock = null;
//     } else if (this._noSleepVideo) {
//       this._noSleepVideo.pause();
//     }
//
//     alert('Wakelock disabled');
//
//     this.isEnabled = false;
//   };s
// }

const oldIOS = () =>
  typeof navigator !== "undefined" &&
  parseFloat(
    (
      "" +
      (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(
        navigator.userAgent
      ) || [0, ""])[1]
    )
    .replace("undefined", "3_2")
    .replace("_", ".")
    .replace("_", "")
  ) < 10 &&
  !window.MSStream;

// Detect native Wake Lock API support
const nativeWakeLock = () => "wakeLock" in navigator;

class WakeLockService {
  constructor() {
    this.enabled = false;
    if (nativeWakeLock()) {
      this._wakeLock = null;
      const handleVisibilityChange = () => {
        if (this._wakeLock !== null && document.visibilityState === "visible") {
          this.enableWakeLock();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("fullscreenchange", handleVisibilityChange);
    } else {
      // Set up no sleep video element
      this.noSleepVideo = document.createElement("video");

      this.noSleepVideo.setAttribute("title", "No Sleep");
      this.noSleepVideo.setAttribute("playsinline", "");

      this._addSourceToVideo(this.noSleepVideo, "webm", media.webm);
      this._addSourceToVideo(this.noSleepVideo, "mp4", media.mp4);

      this.noSleepVideo.addEventListener("loadedmetadata", () => {
        if (this.noSleepVideo.duration <= 1) {
          // webm source
          this.noSleepVideo.setAttribute("loop", "");
        } else {
          // mp4 source
          this.noSleepVideo.addEventListener("timeupdate", () => {
            if (this.noSleepVideo.currentTime > 0.5) {
              this.noSleepVideo.currentTime = Math.random();
            }
          });
        }
      });
    }
  }

  _addSourceToVideo(element, type, dataURI) {
    var source = document.createElement("source");
    source.src = dataURI;
    source.type = `video/${type}`;
    element.appendChild(source);
  }

  get isEnabled() {
    return this.enabled;
  }

  enableWakeLock() {
    if (nativeWakeLock()) {
      return navigator.wakeLock
      .request("screen")
      .then((wakeLock) => {
        this._wakeLock = wakeLock;
        this.enabled = true;
        console.log("Wake Lock active.");
        this._wakeLock.addEventListener("release", () => {
          // ToDo: Potentially emit an event for the page to observe since
          // Wake Lock releases happen when page visibility changes.
          // (https://web.dev/wakelock/#wake-lock-lifecycle)
          console.log("Wake Lock released.");
        });
      })
      .catch((err) => {
        this.enabled = false;
        console.error(`${err.name}, ${err.message}`);
        throw err;
      });
    } else {
      let playPromise = this.noSleepVideo.play();
      return playPromise
      .then((res) => {
        this.enabled = true;
        return res;
      })
      .catch((err) => {
        this.enabled = false;
        throw err;
      });
    }
  }

  disableWakeLock() {
    if (nativeWakeLock()) {
      if (this._wakeLock) {
        this._wakeLock.release();
      }
      this._wakeLock = null;
    } else {
      this.noSleepVideo.pause();
    }
    this.enabled = false;
  }
}

export { WakeLockService };
