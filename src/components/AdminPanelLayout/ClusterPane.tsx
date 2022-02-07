import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Layout} from '../../pages/Layout/Layout';
import styles from './ClusterPane.module.scss';
import Node from './Node';
import MaintenancePopup from './MaintenancePopup';


export const ClusterPane = () => {

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
              <form>
                <label>Node #
                  <textarea>N/A</textarea>
                </label>
                <label>Node #
                  <textarea>N/A</textarea>
                </label>
                <label>Node #
                  <textarea>N/A</textarea>
                </label>
                <Button>Confirm</Button>
              </form>
            </>
          }
          handleClose={() => togglePopup()}
        />
        }
        <Button>Remove Node</Button>
        <Button>Add Node</Button>
        <p>------------------- CLUSTER NAME -------------------</p>
      </div>
      <Node nodeNum={1} statusNum={0}/>
      <Node nodeNum={2} statusNum={1}/>
      <Node nodeNum={3} statusNum={2}/>
      <Node nodeNum={4} statusNum={3}/>
    </Layout>);
};
