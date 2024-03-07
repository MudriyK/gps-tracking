class WakeLockWatcher {
  constructor() {
    this.wakeLock = null;
    this.wakeLockReleased = true;
  }

  async start() {
    if ('wakeLock' in navigator && this.wakeLockReleased) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLockReleased = false;
        console.log('Screen Wake Lock activated.');

        // Add an event listener to re-acquire the wake lock if the page becomes visible again
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        this.wakeLock.addEventListener('release', () => {
          console.log('Screen Wake Lock was released');
          this.wakeLockReleased = true;
        });
      } catch (e) {
        console.error(`Failed to activate Screen Wake Lock: ${e.name}, ${e.message}`);
      }
    } else {
      alert('wakeLock not supported');
      console.log('Screen Wake Lock API is not supported by this browser or wake lock is already acquired.');
    }
  }

  async finish() {
    if (this.wakeLock !== null && !this.wakeLockReleased) {
      await this.wakeLock.release();
      this.wakeLock = null;
      console.log('Screen Wake Lock deactivated.');
    }

    // Remove event listener when wake lock is finished
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  handleVisibilityChange = async () => {
    if (document.visibilityState === 'visible' && this.wakeLockReleased && 'wakeLock' in navigator) {
      this.start(); // Re-acquire the wake lock when the page becomes visible again
    }
  };
}

export { WakeLockWatcher };
