import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import {Form} from 'react-bootstrap';
import ToolTip from '../util/ToolTip';
import { searchModules } from 'api';

const SearchBar = (props : any) => {

    const [searchTerm, setSearchTerm] = useState('');

    const getModuleRequest = async (searchValue : any) => {
        try {
          if (searchTerm.length !== 0) {
            let response = await searchModules(searchValue);
            props.showModules(response)
          }
        } catch (error) {
          console.error(error);
        }
    };

    function handleChange(e : any) {
      let value = e.target.value;
      setSearchTerm(value);
      getModuleRequest(value);
    };

    return (
      <Form className='form-inline d-flex justify-content-center'>
        <ToolTip text='Search' placement='bottom' tool={
            <FontAwesomeIcon icon={['fas', 'search']} size='lg' className={`${styles['search-icon']}`} />
          }>
        </ToolTip>
              
        <Form.Control className={`${styles['search-bar']}`}
          type="search" placeholder="Search..." aria-label="Search" value={searchTerm} onChange={handleChange}/>               
      </Form>
    );
}

export default SearchBar;