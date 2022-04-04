import React, {useState} from 'react';
import {Redirect} from 'react-router';
import {useMount} from '../hooks/useMount';

interface Props {
  path: string;
  delay: number;
}

export function DelayedRedirect({path, delay}: Props) {
  const [redirectNow, setRedirectNow] = useState(false);
  useMount(() => setTimeout(() => setRedirectNow(true), delay));
  return redirectNow ? <Redirect to={path} /> : null;
}
