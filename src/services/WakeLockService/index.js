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

class WakeLockService {
  constructor() {
    this.enabled = false;
    this._wakeLock = null;
    this._noSleepVideo = null;
    this._nativeWakeLock = "wakeLock" in navigator;

    this._setupWakeLock();
  }

  _setupWakeLock() {
    if (this._nativeWakeLock) {
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

    enableWakeLock = async () => {
    if (this.isEnabled) return;

    if (this._nativeWakeLock) {
      try {
        this._wakeLock = await navigator["wakeLock"].request("screen");
        this.isEnabled = true;
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      try {
        await this._noSleepVideo.play();

        this.isEnabled = true;
      } catch (e) {
        this.isEnabled = false;
      }
    }
  };

  // enableWakeLock() {
  //   if (this._nativeWakeLock) {
  //     return navigator.wakeLock
  //     .request("screen")
  //     .then((wakeLock) => {
  //       this._wakeLock = wakeLock;
  //       this.enabled = true;
  //       console.log("Wake Lock active.");
  //       this._wakeLock.addEventListener("release", () => {
  //         console.log("Wake Lock released.");
  //       });
  //     })
  //     .catch((err) => {
  //       this.enabled = false;
  //       console.error(`${err.name}, ${err.message}`);
  //       throw err;
  //     });
  //   } else {
  //     let playPromise = this._noSleepVideo.play();
  //     return playPromise
  //     .then((res) => {
  //       this.enabled = true;
  //       return res;
  //     })
  //     .catch((err) => {
  //       this.enabled = false;
  //       throw err;
  //     });
  //   }
  // }

  disableWakeLock() {
    if (this._nativeWakeLock) {
      if (this._wakeLock) {
        this._wakeLock.release();
      }
      this._wakeLock = null;
    } else {
      this._noSleepVideo.pause();
    }
    this.enabled = false;
  }
}

export { WakeLockService };
