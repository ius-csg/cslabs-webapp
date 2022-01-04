import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Container, Form} from 'react-bootstrap';
import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {isAdmin, isAuthenticated, isCreator} from 'redux/selectors/entities';
import {WebState} from 'redux/types/WebState';
import styles from './ModulesFilter.module.scss';
import {RoutePaths} from 'router/RoutePaths';
import {Module} from 'types/Module';
import {UserModule} from 'types/UserModule';
import {getAdminModules} from 'api';

export type Modules = Module[] | UserModule[];

interface ModulesFilterProps extends ReturnType<typeof mapUserStateToProps> {
  modules: Modules;
  loadModules(): void;
  showSortedModules(modules: Modules): void;
}

const ModulesFilter = (props: ModulesFilterProps) => {

  const creatorSortOptions = [
    props.admin ? { name: 'All Modules', value: 1 } : {},
    { name: 'Type', value: 2},
    { name: 'Published', value: 3}
  ];
  
  const sortOptions = [
    ...(props.creator || props.admin) && window.location.pathname === RoutePaths.contentCreator ? 
    [...creatorSortOptions] : [],
    { name: 'Name', value: 4 },
    { name: 'Difficulty', value: 5 },
    { name: 'Date', value: 6 }
  ];

  const [sortOption, setSortOption] = useState(0);
  const [filterOn, setFilterOn] = useState(false);

  const focusRef = useRef<any>();

  const onFilterClick = () => {
    setFilterOn(!filterOn);
  };

  const onBlur = (e: any) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      setFilterOn(false);
    }
  };

  const onSortChange = (e: any) => {
    let selectedOption = parseInt(e.target.value, 10);
    
    if (selectedOption === sortOption) {
      selectedOption = 0;
    }
    setSortOption(selectedOption);
    showSortedModules(selectedOption);
  };

  const showSortedModules = (option: number) => {
    const modules: Module[] = props.modules[0]['module'] !== undefined ? 
    (props.modules as UserModule[]).map(um => um.module) : props.modules as Module[];

    if (option === 0) // all options unchecked, load original
      props.loadModules();

    getSortedModules(option, modules).then(response => {
      props.showSortedModules(response);
    });
  };

  const getSortedModules = async (option: number, modules: Modules) => {
    switch (option) {
      case 1:
        const allAdminModules = await getAdminModules();
        return allAdminModules;
      case 2:
        return modules.sort( (a: any, b: any) => b.type.localeCompare(a.type) );
      case 3:
        return modules.sort( (a: any, b: any) => a.published - b.published );
      case 4:
        return modules.sort( (a: any, b: any) => a.name.localeCompare(b.name) );
      case 5:
        return modules.sort( (a: any, b: any) => a.difficulty - b.difficulty );
      case 6:
        return modules.sort( (a: any, b: any) => new Date(b?.updatedAt).getTime() - new Date(a?.updatedAt).getTime() );
      default: 
        return modules;
    }
  };

  return (
    <Form
      className='d-flex justify-content-center align-items-center mr-3'
      style={{ position: 'relative' }}
      ref={(ref: any) => focusRef.current = ref}
      onBlur={onBlur}
      tabIndex={-1}
    >
      <FontAwesomeIcon icon={faFilter} size='lg' onClick={onFilterClick} className={styles['icon']} />
      {filterOn &&
        <Form.Group className={styles['filter-options']} >
          <Form.Label column={true} className='p-0'>Sort by</Form.Label>
          <Container className='pr-0 pl-4'>
          {sortOptions.map((option, idx) => (
            option.value &&
            <Form.Check
              className={styles['sort-option']}
              key={idx}
              id={`radio-${idx}`}
              type='checkbox'
              label={option.name}
              name='radio'
              value={option.value}
              checked={sortOption === option.value}
              onChange={onSortChange}
            />
          ))}
          </Container>
        </Form.Group>
      }
    </Form>
  );
};

const mapUserStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state), creator: isCreator(state), admin: isAdmin(state)});
export default connect(mapUserStateToProps)(ModulesFilter);