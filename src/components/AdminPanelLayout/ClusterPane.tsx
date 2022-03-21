import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Layout} from '../../pages/Layout/Layout';
import styles from './ClusterPane.module.scss';
import Node from './Node';
import MaintenancePopup from './MaintenancePopup';
import Datetime from 'react-datetime';
// tslint:disable-next-line:no-import-side-effect
import 'react-datetime/css/react-datetime.css';

export const ClusterPane = (props: {clusterName: string}) => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (<Layout>
      <div className={styles['cluster-pane']}>
        <Button onClick={togglePopup}>Set Maintenance Mode</Button>
        {isOpen && <MaintenancePopup
          content={
            <>
              <h2>Maintenance Scheduler</h2>
              <p>{props.clusterName}</p>
              <form>
                <label>Node #
                  <Datetime />
                </label>
                <label>Node #
                  <Datetime />
                </label>
                <label>Node #
                  <Datetime />
                </label>
                <Button onClick={togglePopup}>Confirm</Button>
              </form>
            </>
          }
          handleClose={() => togglePopup()}
        />
        }
        <Button>Remove Node</Button>
        <Button>Add Node</Button>
        <p>{props.clusterName}</p>
      </div>
      <Node nodeNum={1} statusNum={0} deployedNum={2} avgCPU={53} currentCPU={30} avgRAM={50} currentRAM={45} drive1={250} drive2={500} uptime={2500}/>
      <Node nodeNum={2} statusNum={1} deployedNum={0} avgCPU={75} currentCPU={90} avgRAM={80} currentRAM={85} drive1={25} drive2={50} uptime={9500}/>
      <Node nodeNum={3} statusNum={2} deployedNum={2} avgCPU={53} currentCPU={30} avgRAM={50} currentRAM={45} drive1={250} drive2={500} uptime={2500}/>
      <Node nodeNum={4} statusNum={3} deployedNum={2} avgCPU={53} currentCPU={30} avgRAM={50} currentRAM={45} drive1={250} drive2={500} uptime={2500}/>
    </Layout>);
};
