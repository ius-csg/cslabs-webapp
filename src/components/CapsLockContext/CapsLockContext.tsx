import * as React from 'react';
import {useState} from 'react';

type SetCapsLockFunction = (value: boolean) => void;

interface CapsLockContextValue {
  capsLock: boolean;
  setCapsLock: SetCapsLockFunction;
}
// tslint:disable-next-line:no-empty
const defaultSetCapsLock: SetCapsLockFunction = _ => { };

export const CapsLockContext = React.createContext<CapsLockContextValue>({
  capsLock: false,
  // tslint:disable-next-line:no-empty
  setCapsLock: defaultSetCapsLock
});

export function CapsLockContextProvider(props: {children: any}) {
  const [capsLockState, setCapsLockState] = useState<CapsLockContextValue>({
    capsLock: false,
    setCapsLock: defaultSetCapsLock
  });

  if (capsLockState.setCapsLock === defaultSetCapsLock) {
    setCapsLockState({...capsLockState, setCapsLock: (val) => setCapsLockState({...capsLockState, capsLock: val})});
  }
  return (
    <CapsLockContext.Provider value={capsLockState}>
      {props.children}
    </CapsLockContext.Provider>
  );
}
