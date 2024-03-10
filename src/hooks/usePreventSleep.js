import { useEffect } from 'react';
import { NO_SLEEP_REFRESH_TIMEOUT } from '../constants';

const usePreventSleep = () => {
  useEffect(() => {
    // Create an iframe element
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // Make iframe invisible
    iframe.id = 'refreshFrame';
    iframe.src = 'about:blank';
    document.body.appendChild(iframe); // Append iframe to the body

    // Set up an interval to refresh the iframe src
    const intervalId = setInterval(() => {
      iframe.src = "about:blank?rand=" + Math.random();
    }, NO_SLEEP_REFRESH_TIMEOUT);

    // Cleanup function to clear the interval and remove the iframe
    return () => {
      clearInterval(intervalId);
      document.body.removeChild(iframe);
    };
  }, []);

  // The component does not render anything itself
  return null;
};

export { usePreventSleep };
