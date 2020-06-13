import {useEffect, useRef} from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {savedCallback.current = callback; }, [callback]);
  // Set up the interval.
  // @ts-ignore
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
