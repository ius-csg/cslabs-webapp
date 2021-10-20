import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import {Form} from 'react-bootstrap';
import ToolTip from '../util/ToolTip';

const SearchBar = (props: any) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: any) => {
      let searchValue = e.target.value;
      setSearchTerm(searchValue);
      props.showModules(searchValue)
    };

    return (
      <Form className='form-inline d-flex justify-content-center' onSubmit={(e: any) => {e.preventDefault()}}>
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