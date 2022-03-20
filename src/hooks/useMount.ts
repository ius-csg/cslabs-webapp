import {EffectCallback, useEffect} from 'react';

export function useMount(func: EffectCallback | (() => Promise<any>) | (() => any)) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {func(); }, []);
}
