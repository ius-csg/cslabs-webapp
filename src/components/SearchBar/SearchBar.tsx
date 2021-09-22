import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ToolTip from '../util/ToolTip';

const SearchBar = (props : any) => {





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