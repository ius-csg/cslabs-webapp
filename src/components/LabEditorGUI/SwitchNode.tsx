import React from 'react';
import switchSVG from '../../assets/icons/switch.svg';
import longSwitchSVG from '../../assets/icons/switch-48port.svg';
import changeSelected from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';

const SwitchNode = ({data, id, inputs, outputs}: any) => {

  const selectedNode = useSelector((state: any) => state.gui);
  const dispatch = useDispatch();

  const handleSelect = () => {
    // Timeout will override the deselect click event in the diagram div
    // There might be a better way to handle this
    setTimeout(() => dispatch(changeSelected({selectedID: id})), 10);
  };

  return (
    <div
      style={id === selectedNode.selectedID ? {
        border: '3px solid #ABDEF6',
        borderRadius: '5px',
        cursor: 'default'
      } : {cursor: 'default'}}
    >
        {outputs.length >= 8 &&
        <div style={{marginTop: '0px', display: 'flex', flexDirection: 'column'}} onClick={handleSelect}>
          <div style={{display: 'flex', alignSelf: 'start'}}>
            {inputs.map((port: any) => React.cloneElement(port, {
              style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
            })).slice(inputs.length / 2, inputs.length)}
          </div>
          <div style={{display: 'flex', alignSelf: 'start'}}>
            {inputs.map((port: any) => React.cloneElement(port, {
              style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
            })).slice(0, inputs.length / 2)}
          </div>
          {(outputs.length + inputs.length) >= 24
            ?
            <img src={longSwitchSVG} alt='Switch' draggable={false} style={{height: '55px', pointerEvents: 'none'}}/>
            : <img src={switchSVG} alt='Switch' draggable={false} style={{height: '55px', pointerEvents: 'none'}}/>}
          <div style={{display: 'flex', alignSelf: 'start'}}>
            {outputs.map((port: any) => React.cloneElement(port, {
              style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
            })).slice(outputs.length / 2, outputs.length)}
          </div>
          <div style={{display: 'flex', alignSelf: 'start'}}>
            {outputs.map((port: any) => React.cloneElement(port, {
              style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
            })).slice(0, outputs.length / 2)}
          </div>
        </div>
        }
        {outputs.length < 8 &&
          <div style={{marginTop: '0px', display: 'flex', flexDirection: 'column'}} onClick={handleSelect}>
            <div style={{display: 'flex', alignSelf: 'start'}}>
              {inputs.map((port: any) => React.cloneElement(port, {
                style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
              }))}
            </div>
              <img src={switchSVG} alt='Switch' draggable={false} style={{height: '55px', pointerEvents: 'none'}}/>
            <div style={{display: 'flex', alignSelf: 'start'}}>
              {outputs.map((port: any) => React.cloneElement(port, {
                style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
              }))}
            </div>
          </div>
          }
    </div>);
};

export default SwitchNode;
