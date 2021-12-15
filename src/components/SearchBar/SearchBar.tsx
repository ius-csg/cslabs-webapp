import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Tag } from 'react-tag-autocomplete';
import styles from './SearchBar.module.scss';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import ToolTip from '../util/ToolTip';
import { getTags } from '../../api';
import { TagEditor } from '../../components/TagEditor/TagEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = (props: any) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [tagSuggestions, setTagSuggestions] = React.useState<Tag[]>([]);

  const [searchOptionsOn, setSearchOptionsOn] = useState(false);

  const onSearchTermChange = (e: any) => {
    if (!searchOptionsOn) {
      setSearchTerm(e.target.value);
    }
  };

  const onTitleChange = (e: any) => {
    const searchTitle = e.target.value;
    setTitle(searchTitle);

    setSearchTerm(searchTitle && 'title:' + searchTitle);
  };

  const onDescriptionChange = (e: any) => {
    const desc = e.target.value;
    setDescription(desc);
    // props.showModules(searchValue);
  };

  const onDifficultyChange = (e: any) => {
    const diff = e.target.value;
    setDifficulty(diff);
  };

  async function handleTagSuggestions() {
    setTagSuggestions(await getTags());
  }

  const handleSearchOptionsOn = (e: any) => {
    (searchOptionsOn) ? setSearchOptionsOn(false) : setSearchOptionsOn(true);
  };

  function onAddTags(newTag: Tag) {
    handleTagSuggestions();
    let newTags = new Array<Tag>();
    newTags = newTags.concat(tags, newTag);
    setTags(newTags);
  }

  function onDeleteTags(i: number) {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  }

  return (
    <React.Fragment>
      <Form className='form-inline d-flex justify-content-end' style={{ position: 'relative' }}>
        <Row className={`${styles['search-bar']} align-items-center`} noGutters={true}>
          <Col>
            <ToolTip key='search-icon' text='Search' placement='bottom'>
              <FontAwesomeIcon icon={faSearch} size='lg' className={styles['icon']} />
            </ToolTip>
          </Col>
          <Col xs={10}>
            <Form.Control
              type='search'
              placeholder='Search...'
              value={searchTerm}
              onChange={onSearchTermChange}
              style={{ boxShadow: 'none', border: 'none', height: '28px' }}
            />
          </Col>
          <Col>
            <ToolTip key='search-options' text='Search options' placement='bottom'>
              <FontAwesomeIcon icon={faSlidersH} size='lg' className={styles['icon']} onClick={handleSearchOptionsOn} />
            </ToolTip>
          </Col>
        </Row>

        {searchOptionsOn &&
          <Container className={styles['search-options']}>
            <Form.Group>
              <Form.Label column={true} className='justify-content-start'>Title</Form.Label>
              <Form.Control
                size='sm'
                type='search'
                placeholder='Title...'
                value={title}
                onChange={onTitleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label column={true} className='justify-content-start'>Description</Form.Label>
              <Form.Control
                size='sm'
                type='search'
                placeholder='Description...'
                value={description}
                onChange={onDescriptionChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label column={true} className='justify-content-start'>Difficulty</Form.Label>
              <Form.Control
                size='sm'
                as='select'
                id='difficultySelection'
                type='difficulty'
                value={difficulty}
                onChange={onDifficultyChange}
              >
                <option value='0'>Easy</option>
                <option value='1'>Medium</option>
                <option value='2'>Hard</option>
                <option value='3'>Very Hard</option>
              </Form.Control>
            </Form.Group>
            <hr />
            <Form.Group>
              <Form.Label column={true} className='justify-content-start'>Tags</Form.Label>
              <TagEditor
                tags={tags}
                tagSuggestions={tagSuggestions}
                onAdd={onAddTags}
                onDelete={onDeleteTags}
                onInput={handleTagSuggestions}
                editing={true}
                classNames={{
                  rootFocused: styles['react-tags.is-focused'],
                  selectedTag: styles['react-tags-selected-tag'],
                  search: styles['react-tags-search'],
                  suggestions: styles['react-tags-suggestions']
                }}
              />
            </Form.Group>
            <Row className='float-right mt-4'>
              <Button type='reset' className='mr-2' variant='light'>Reset</Button>
              <Button type='submit'>Search</Button>
            </Row>
          </Container>}
      </Form>
    </React.Fragment>
  );
};

export default SearchBar;