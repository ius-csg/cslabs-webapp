import React, {useState} from 'react';
import {Alert, Button} from 'react-bootstrap';

export const Alerts = () => {

    const [show, setShow] = useState(true);

    if (show) {
        return (
          <Alert variant='danger' onClose={() => setShow(false)}>
            <Alert.Heading>Warning! CSLabs will be unavailable until August 24th, 2021 for maintenance.
            <div className='d-flex justify-content-end'>
            <Button onClick={() => setShow(false)} variant='outline-light'>
              X //add x icon
            </Button>
            </div>
            </Alert.Heading>
          </Alert>
        );
    }
  else {
    return null;
    }

};

// danger, warning, info
