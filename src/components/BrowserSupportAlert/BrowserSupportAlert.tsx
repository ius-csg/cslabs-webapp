import {Modal} from 'react-bootstrap';
import browserDetect from 'browser-detect';

export const BrowserSupportAlert = () => {
  const browserInfo = browserDetect();
  if(browserInfo.name !== 'safari') {
    return null;
  }
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Unsupported Browser</Modal.Title>
      </Modal.Header>
      <Modal.Body>Currently we do not support safari, please use Firefox or Chrome for the best experience.</Modal.Body>
    </Modal>
  );
};
