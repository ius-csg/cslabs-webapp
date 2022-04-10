import {useState} from 'react';

export function usePerformRequest() {
  const [{loading, error}, setSending] = useState({error: false, loading: false});
  const performRequest = async (action: () => Promise<any>) => {
    try {
      setSending({loading: true, error: false});
      await action();
      setSending({loading: false, error: false});
    } catch {
      setSending({loading: false, error: true});
    }
  };
  const setError = (err: boolean) => setSending({loading: loading, error: err});
  return {performRequest, loading, error, setError};
}
