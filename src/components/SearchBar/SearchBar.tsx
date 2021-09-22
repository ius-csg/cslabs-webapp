import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
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



    return (
      <Form className='form-inline d-flex justify-content-center'>
        <ToolTip text='Search' placement='bottom' tool={
          <Link to='/' type="submit" className={`${styles['search-icon']}`}>
            <FontAwesomeIcon icon={['fas', 'search']} size='2x' />
          </Link>} >
        </ToolTip>
              
        <Form.Control className={`${styles['search-bar']}`}
          type="search" placeholder="Search..." aria-label="Search"/>               
      </Form>
    );
}

export default SearchBar;