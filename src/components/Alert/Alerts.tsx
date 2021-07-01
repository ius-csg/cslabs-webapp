import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';

export const Alerts = () => {

    const [show, setShow] = useState(true);

    if (show) {
        return (
          <div className='d-block text-center'>
             <Alert dismissible={true} variant='danger' onClose={() => setShow(false)}>
            <Alert.Heading>CSLabs will be unavailable until August 24th, 2021 for maintenance.
            </Alert.Heading>
          </Alert>
          </div>
        );
    }
  else {
    return null;
    }

};

// danger, warning, info
