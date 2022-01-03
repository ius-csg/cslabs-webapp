import {faSlidersH, faSearch} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useRef, useState} from 'react';
import {Tag} from 'react-tag-autocomplete';
import styles from './ModulesSearch.module.scss';
import {Form, Row, Col, Button, Container} from 'react-bootstrap';
import ToolTip from '../util/ToolTip';
import {getTags, searchEditorsModules, searchModules, 
  searchOptionsEditorsModules, searchOptionsModules, 
  searchOptionsUserModules, searchUserModules 
} from '../../api';
import {TagEditor} from '../TagEditor/TagEditor';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Formik} from 'formik';
import {SearchOptions} from 'types/SearchOptions';
import {makeSearchInputs} from 'factories';
import {Module, ModuleDifficulty} from 'types/Module';
import {UserModule} from 'types/UserModule';
import {getModuleDifficultyLabel, moduleDifficultyOptions} from '../../util';
import {connect} from 'react-redux';
import {WebState} from 'redux/types/WebState';
import {isAdmin, isAuthenticated, isCreator} from 'redux/selectors/entities';
import {RoutePaths} from 'router/RoutePaths';
import Select from 'react-select';

export type Modules = Module[] | UserModule[];

interface ModulesSearchProps extends ReturnType<typeof mapStateToProps> {
  loadModules(): void;
  showSearchedModules(modules: Modules): void;
}

const ModulesSearch = (props: ModulesSearchProps) => {

  const initialState = makeSearchInputs();

  const [searchInputs, setSearchInputs] = useState<SearchOptions>(initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermTags, setSearchTermTags] = React.useState<Tag[]>([]);
  const [searchOptionsOn, setSearchOptionsOn] = useState(false);
  const [tagSuggestions, setTagSuggestions] = React.useState<Tag[]>([]);
  
  const focusRef = useRef<any>();

  const showSearchedModules = async (searchValue: string) => {
    if (searchValue.length !== 0) {
      let modules: Modules = [];
      if ( (props.admin || props.creator) && window.location.pathname === RoutePaths.contentCreator ) {
        modules = await searchEditorsModules(searchValue);
      }
      else if (props.authenticated && window.location.pathname === RoutePaths.myModules) {
        modules = await searchUserModules(searchValue);
      }
      else {
        modules = await searchModules(searchValue);
      }
      props.showSearchedModules(modules);
    }
    else {
      props.loadModules();
    }
  };

  const showSearchedOptionsModules = async (searchParams: SearchOptions) => {
    if (searchParams) {
      let modules: Modules = [];
      if ( (props.admin || props.creator) && window.location.pathname === RoutePaths.contentCreator ) {
        modules = await searchOptionsEditorsModules(searchParams);
      }
      else if (props.authenticated && window.location.pathname === RoutePaths.myModules) {
        modules = await searchOptionsUserModules(searchParams);
      }
      else {
        modules = await searchOptionsModules(searchParams);
      }
      props.showSearchedModules(modules);
    }
    else {
      props.loadModules();
    }
  };

  const onSearchTermChange = (e: any) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (!searchOptionsOn) {
      showSearchedModules(searchValue);
    }
  };

  const onTitleChange = (e: any) => {
    const title = e.target.value;
    setSearchInputs({ ...searchInputs, title: title });
  };

  const onDescriptionChange = (e: any) => {
    const desc = e.target.value;
    setSearchInputs({ ...searchInputs, description: desc });
  };

  const onDifficultyChange = (option: any) => {
    const diff = option.value as ModuleDifficulty;
    setSearchInputs({ ...searchInputs, difficulty: diff });
  };

  const onTagAdd = (newTag: Tag) => {
    setSearchTermTags(searchTermTags.concat(newTag));
    setSearchInputs({ ...searchInputs, tags: [...searchInputs.tags, newTag] });
  };

  const onTagDelete = (idx: number) => {
    const tagTBD = searchInputs.tags[idx];
    setSearchTermTags(searchTermTags.filter(tag => tag.name !== tagTBD.name));
    setSearchInputs({ ...searchInputs, tags: searchInputs.tags.filter(tag => tag.name !== tagTBD.name) });
  };

  const onSearchTermTagDelete = (idx: number) => {
    const tagTBD = searchTermTags[idx];

    if (tagTBD.id === 'title') {
      setSearchInputs({ ...searchInputs, title: '' });
    } else if (tagTBD.id === 'desc') {
      setSearchInputs({ ...searchInputs, description: '' });
    } else if (tagTBD.id === 'diff') {
      setSearchInputs({ ...searchInputs, difficulty: 0 });
    } else {
      setSearchInputs({ ...searchInputs, tags: searchInputs.tags.filter(tag => tag.name !== tagTBD.name) });
    }
  };

  async function handleTagSuggestions(input: string) {
    setTagSuggestions(await getTags(input));
  }

  const onSearchOptionsOn = () => {
    setSearchOptionsOn(!searchOptionsOn);
  };

  const onBlur = (e: any) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      setSearchOptionsOn(false);
    }
  };
  
  const onReset = () => {
    setSearchInputs(initialState);
    props.loadModules();
  };

  const onSubmit = () => {
    showSearchedOptionsModules(searchInputs);
  };

  useEffect(() => {
    function updateSearchTermTags() {
      let tags: Tag[] = [];
      if (searchInputs.title.length !== 0) {
        tags.push({ id: 'title', name: `Title: ${searchInputs.title.substring(0, 10)}` });
      }
      if (searchInputs.description.length !== 0) {
        tags.push({ id: 'desc', name: `Description: ${searchInputs.description.substring(0, 15)}` });
      }
      if (searchInputs.difficulty !== 0) {
        tags.push({ id: 'diff', name: `Difficulty: ${getModuleDifficultyLabel(searchInputs.difficulty)}` });
      }
      tags = tags.concat(searchInputs.tags);
      
      setSearchTermTags(tags);
    }
    updateSearchTermTags();
  }, [searchInputs]);

  return (
    <Formik
      initialValues={initialState}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {({ handleSubmit, handleReset }) => (
        <Form 
          className='form-inline d-flex justify-content-center position-relative'
          ref={(ref: any) => focusRef.current = ref}
          onBlur={onBlur}
          tabIndex={-1}
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <Row className={`${styles['search-bar']} align-items-center`} noGutters={true}>
            <Col xs={1} className={styles['icon']}>
              <ToolTip id='search-icon' text='Search' placement='bottom'>
                <FontAwesomeIcon icon={faSearch} size='lg' />
              </ToolTip>
            </Col>
            <Col xs={10}>
              {searchOptionsOn ?
                <TagEditor
                  tags={searchTermTags}
                  onAdd={() => {return;}} // should not directly add tags to search term
                  onDelete={onSearchTermTagDelete}
                  editing={true}
                  classNames={{
                    root: styles['tags-no-border'],
                    rootFocused: styles['tags-focused'],
                    selectedTag: styles['selected-tag'],
                    search: styles['tags-search'],
                    suggestions: styles['tags-suggestions'],
                    searchInput: styles['tags-input']
                  }}
                /> :
                <Form.Control
                  type='search'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={onSearchTermChange}
                  style={{ boxShadow: 'none', border: 'none', height: 'auto' }}
                />
              }
            </Col>
            <Col xs={1} className={styles['icon']}>
              <ToolTip id='search-options' text='Search options' placement='bottom'>
                <FontAwesomeIcon icon={faSlidersH} size='lg' onClick={onSearchOptionsOn} />
              </ToolTip>
            </Col>
          </Row>

          { searchOptionsOn &&
            <Container className={styles['search-options']}>
              <Form.Group className={styles['input-row']}>
                <Form.Label column={true} className='justify-content-start'>Title</Form.Label>
                <Form.Control
                  name='title'
                  size='sm'
                  type='search'
                  placeholder='Title...'
                  value={searchInputs.title}
                  onChange={onTitleChange}
                  className={styles['search-input']}
                />
              </Form.Group>
              <Form.Group className={styles['input-row']}>
                <Form.Label column={true} className='justify-content-start'>Description</Form.Label>
                <Form.Control
                  size='sm'
                  type='search'
                  placeholder='Description...'
                  value={searchInputs.description}
                  onChange={onDescriptionChange}
                  className={styles['search-input']}
                />
              </Form.Group>
              <Form.Group className={styles['input-row']}>
                <Form.Label column={true} className='justify-content-start'>Difficulty</Form.Label>
                <Select
                  defaultValue={moduleDifficultyOptions[0]}
                  options={moduleDifficultyOptions}
                  value={{value: searchInputs.difficulty, label: getModuleDifficultyLabel(searchInputs.difficulty)}}
                  onChange={onDifficultyChange}
                  styles={{
                    container : (provided) => ({
                       ...provided, fontSize: '0.930125rem' 
                    }),
                    control: (provided) => ({
                      ...provided, minWidth: 110, height: 'calc(1.5em + 1rem + 2px)'
                    }), 
                    dropdownIndicator: (provided) => ({ 
                      ...provided, width: 30 
                    }),
                    singleValue: (provided) => ({
                      ...provided, color: searchInputs.difficulty === 0 ? '#868E96' : '#495057'
                    })
                  }}
                  theme={(theme) => ({ 
                    ...theme, colors: { ...theme.colors, primary: '#4582ec'}
                  })}
                />
              </Form.Group>
              <hr />
              <Form.Group className={styles['input-row']}>
                <Form.Label column={true} className='justify-content-start'>Tags</Form.Label>
                <TagEditor
                  tags={searchInputs.tags}
                  tagSuggestions={tagSuggestions}
                  onAdd={onTagAdd}
                  onDelete={onTagDelete}
                  onInput={handleTagSuggestions}
                  editing={true}
                  classNames={{
                    root: styles['tags'],
                    rootFocused: styles['tags-focused'],
                    selectedTag: styles['selected-tag'],
                    search: styles['tags-search'],
                    suggestions: styles['tags-suggestions']
                  }}
                />
              </Form.Group>
              <Row className='float-right mt-4'>
                <Button type='reset' className='mr-2' variant='light'>Reset</Button>
                <Button type='submit'>Search</Button>
              </Row>
            </Container>
          }
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state), creator: isCreator(state), admin: isAdmin(state)});
export default connect(mapStateToProps)(ModulesSearch);