import React from 'react';
import styles from './MaintenancePopup.module.scss';

const MaintenancePopup = (props: { handleClose: () => void; content: React.ReactNode }) => {
  return (
    <div className={styles['popup-box']}>
      <div className={styles['box']}>
        <span className={styles['close-icon']} onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default MaintenancePopup;
