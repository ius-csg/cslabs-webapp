import React from 'react';
import switchSVG from '../../assets/icons/switch.svg';
import longSwitchSVG from '../../assets/icons/switch-48port.svg';
import changeSelected from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';
import styles from './SwitchNode.module.scss';

const SwitchNode = ({id, inputs, outputs}: any) => {

  const selectedNode = useSelector((state: any) => state.gui);
  const dispatch = useDispatch();

  const handleSelect = () => {
    // Timeout will override the deselect click event in the diagram div
    // There might be a better way to handle this
    setTimeout(() => dispatch(changeSelected({selectedID: id})), 10);
  };

  function generatePorts(portType: object[]) {
    return(
    portType.map((port: any) => React.cloneElement(port, {
      style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
    })));
  }

  return (
    <div
      className={id === selectedNode.selectedID ?
        styles.selected : styles.unselected}
    >
      <div onContextMenu={handleSelect} onClick={handleSelect}>
        {outputs.length >= 8 &&
        <div className={styles.switchContainer}>
          <div className={styles.portContainer}>
            {generatePorts(inputs).slice(inputs.length / 2, inputs.length)}
          </div>
          <div className={styles.portContainer}>
            {generatePorts(inputs).slice(0, inputs.length / 2)}
          </div>
          {(outputs.length + inputs.length) >= 24
            ?
            <img src={longSwitchSVG} alt='Switch' draggable={false} className={styles.switchImage}/>
            : <img src={switchSVG} alt='Switch' draggable={false} className={styles.switchImage}/>}
          <div className={styles.portContainer}>
            {generatePorts(outputs).slice(outputs.length / 2, outputs.length)}
          </div>
          <div className={styles.portContainer}>
            {generatePorts(outputs).slice(0, outputs.length / 2)}
          </div>
        </div>
        }
        {outputs.length < 8 &&
          <div className={styles.switchContainer}>
            <div className={styles.portContainer}>
              {generatePorts(inputs)}
            </div>
              <img src={switchSVG} alt='Switch' draggable={false} className={styles.switchImage}/>
            <div className={styles.portContainer}>
              {generatePorts(outputs)}
            </div>
          </div>
          }
      </div>
    </div>);
};

export default SwitchNode;
