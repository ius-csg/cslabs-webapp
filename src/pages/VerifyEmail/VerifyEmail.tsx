import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {verifyEmail} from '../../api';
import {Spinner} from 'react-bootstrap';

interface VerifyEmailProps {

}

export function VerifyEmail (props: VerifyEmailProps) {

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function initialize() {
      const {code} = params;
      try {
        await verifyEmail(code!);
        setLoading(false);
        setVerified(true);
      } catch {
        setLoading(false);
        setVerified(false);
      }
    }
    initialize();
  }, []);

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
        <Spinner animation='border'/>
      </div>
    );
  }
  return (
    <p style={{textAlign: 'center', marginTop: '3rem'}}>
      {verified ? 'Your email has successfully been verified!': 'Sorry, we could not verify your email at this time.'}
    </p>
  );

}
