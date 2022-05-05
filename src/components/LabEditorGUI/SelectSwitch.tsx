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
import SwitchButton from './SwitchButton';

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
          <SwitchButton handleSelect={() => handleSelect(5)} imageSrc={FivePort} portSize={5}/>
          <SwitchButton handleSelect={() => handleSelect(8)} imageSrc={EightPort} portSize={8}/>
          <SwitchButton handleSelect={() => handleSelect(16)} imageSrc={SixteenPort} portSize={16}/>
          <SwitchButton handleSelect={() => handleSelect(24)} imageSrc={TwentyFourPort} portSize={24}/>
          <SwitchButton handleSelect={() => handleSelect(48)} imageSrc={FortyEightPort} portSize={48}/>
        </div>
      </div>
  );
};

export default SelectSwitch;
