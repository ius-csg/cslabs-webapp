import styles from './SelectSwitch.module.scss';
import React from 'react';

interface SwitchProperties {
  handleSelect: any;
  imageSrc: string;
  portSize: number;
}

const SwitchButton = ({handleSelect, imageSrc, portSize} : SwitchProperties) => {

  return(
    <div className={styles.switchContainer}>
      <button onClick={() => handleSelect(portSize)} className={styles.switchButton}>
        <img src={imageSrc} alt='EightPort' style={portSize >= 16 ? {height: '7em'} : {height: '4.75em'}}/>
      </button>
      {portSize} Port
    </div>
  );
};

export default SwitchButton;
