import React from 'react';
// @ts-ignore
import FivePort from '../../assets/images/LabEditor/FivePortSwitch.png';
// @ts-ignore
import EightPort from '../../assets/images/LabEditor/EightPortSwitch.png';
// @ts-ignore
import SixteenPort from '../../assets/images/LabEditor/SixteenPortSwitch.png';
// @ts-ignore
import TwentyFourPort from '../../assets/images/LabEditor/Twenty-FourPortSwitch.png';
// @ts-ignore
import FortyEightPort from '../../assets/images/LabEditor/Forty-EightPortSwitch.png';
import closeIcon from '../../assets/icons/close.svg';
import styles from './SelectSwitch.module.scss';

const SelectSwitch = ({close, addSwitch}: any) => {
  const handleSelect = (ports: number) => {
    addSwitch(ports);
    close();
  };

  return (
      <div className={styles.componentContainer}>
        <button onClick={close} className={styles.closeButton}>
          <img src={closeIcon} alt='Close'/>
        </button>
        <h2 style={{display: 'flex', justifyContent: 'center', paddingTop:'1em'}}>Select a Switch</h2>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className={styles.switchContainer}>
            <button onClick={() => handleSelect(5)} style={{height: '8em', border:'none', background:'none'}}>
              <img src={FivePort} alt='FivePort' style={{height: '4.75em'}}/>
            </button>
            5 Port
          </div>
          <div className={styles.switchContainer}>
            <button onClick={() => handleSelect(8)} className={styles.switchButton}>
              <img src={EightPort} alt='EightPort' style={{height: '4.75em'}}/>
            </button>
            8 Port
          </div>
          <div className={styles.switchContainer}>
            <button onClick={() => handleSelect(16)} className={styles.switchButton}>
              <img src={SixteenPort} alt='SixteenPort' style={{height: '7em'}}/>
            </button>
            16 Port
          </div>
          <div className={styles.switchContainer}>
            <button onClick={() => handleSelect(24)} className={styles.switchButton}>
              <img src={TwentyFourPort} alt='TwentyFourPort' style={{height: '7em'}}/>
            </button>
            24 Port
          </div>
          <div className={styles.switchContainer}>
            <button onClick={() => handleSelect(48)} className={styles.switchButton}>
              <img src={FortyEightPort} alt='FortyEightPort' style={{height: '7em'}}/>
            </button>
            48 Port
          </div>
        </div>
      </div>
  );
};

export default SelectSwitch;
