import {faSlidersH, faSearch} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import {Form, Container, Row, Col, Button} from 'react-bootstrap';
import ToolTip from '../util/ToolTip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FieldArray} from 'formik';
import {TagEditor} from '../../components/TagEditor/TagEditor';

const SearchBar = (props: any) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [description, setDescription] = useState('');
    const [advancedSearchOn, setAdvancedSearchOn] = useState(false);

    const handleChange = (e: any) => {
      const searchValue = e.target.value;
      setSearchTerm(searchValue);
      // props.showModules(searchValue);
    };

    const handleDescription = (e: any) => {
      const searchValue = e.target.value;
      setDescription(searchValue);
      // props.showModules(searchValue);
    };

    const getUpdateSearchValue = () => {
      // searchTerm && `title:${searchTerm}` +  description && `desc:${description}`
      let searchText = '';
      if (searchTerm) {searchText += `title:${searchTerm} `}
      if (description) {searchText += `desc:${description}`}
      return searchText;
    };

    const handleSettings = () => {
      (advancedSearchOn) ? setAdvancedSearchOn(false) : setAdvancedSearchOn(true);
    };

    return (
      <React.Fragment>
      <Form className='form-inline d-flex justify-content-end' style={{position: 'relative'}} onSubmit={(e: any) => e.preventDefault()}>
        <Row className={`${styles['search-bar']} align-items-center`} noGutters={true}>
          <Col>
            <ToolTip key='search-icon' text='Search' placement='bottom'>
              <FontAwesomeIcon icon={faSearch} size='lg' />
            </ToolTip>
          </Col>
          <Col xs={10}>
            <Form.Control
              type='search'
              placeholder='Search...'
              aria-label='Title'
              value={getUpdateSearchValue()}
              onChange={handleChange}
              style={{boxShadow: 'none', border: 'none', height: '28px'}}
            />
          </Col>
          <Col>
            <ToolTip key='search-options' text='Search options' placement='bottom'>
              <FontAwesomeIcon icon={faSlidersH} size='lg' onClick={handleSettings}/>
            </ToolTip>
          </Col>
        </Row>

        {advancedSearchOn &&
        <Container style={{backgroundColor: 'white', width: '28rem', position: 'absolute', right: '0', top: '58px', zIndex: 1, borderRadius: 6, boxShadow: '0 0 8px rgb(175, 175, 175)', padding: '24px'}}>
          <Row>
            <Col><p style={{lineHeight: 3}}>Title</p></Col>
            <Col>
              <Form.Control
                type='search'
                placeholder='Title...'
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col><p style={{lineHeight: 3}}>Description</p></Col>
            <Col>
              <Form.Control
                type='description'
                placeholder='Description...'
                onChange={handleDescription}
              />
            </Col>
          </Row>
          <Row>
            <Col><p style={{lineHeight: 3}}>Difficulty</p></Col>
            <Col>
              <Form.Control
                as='select'
                id='difficultySelection'
                type='difficulty'
              >
                <option value='0'>Easy</option>
                <option value='1'>Medium</option>
                <option value='2'>Hard</option>
                <option value='3'>Very Hard</option>
              </Form.Control>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col><p style={{lineHeight: 3}}>Tags</p></Col>
            <Col>
              <Form.Control
                type='tags'
                placeholder='Tags...'
              />
            </Col>
            <Form.Label column={true}>Tags</Form.Label>
            <FieldArray name={propertyOf<ModuleForm>('moduleTags')}>
              {(helpers) => (
                <TagEditor
                  tags={values.moduleTags.map(mt => mt.tag)}
                  tagSuggestions={tagSuggestions}
                  mes={message?.variant}
                  editing={editing}
                  onAdd={t => helpers.push(cast<ModuleTag>({moduleId: Number(moduleId), tagId: (t.id === 0) ? t.id : 0, tag: t}))}
                  onDelete={i => helpers.remove(i)}
                  onInput={onTagInput}
                />
              )}
            </FieldArray>
          </Row>
          <Row className='float-right'>
            <Button className='mr-2' variant='light'>Reset</Button>
            <Button>Search</Button>
          </Row>
        </Container>}
      </Form>
      </React.Fragment>
    );
};

export default SearchBar;