import React, {useEffect, useState} from 'react';
import ReactTags, {Tag, ClassNames} from 'react-tag-autocomplete';
import {} from './TagEditor.scss';
import {usePerformRequest} from '../../util/usePerformRequest';
import {getTags} from '../../api';
import {Message} from '../../util/Message';

interface Props {
  tags: Tag[];
  mes?: string;
  editing: boolean;
  onAdd(tag: Tag): void;
  onSearch?(term: string): Tag[];
  onDelete(i: number): void;
  onInput?(name: string): void;
}

const formatTag = (tag: Tag) => tag.name.charAt(0).toUpperCase() + tag.name.substring(1);

export function TagEditor(props: Props) {
  const {tags, onSearch, onDelete, mes, editing} = props;
  const [className, setClassName] = useState('disabled');
  const [invalid, setInvalid] = useState('');
  const Filter = require('bad-words');
  const BadWordList = require('badwords-list');
  const badWordList = BadWordList.array;
  const filter = new Filter();


  const [tagSuggestions, setTagSuggestions] = React.useState<Tag[]>([]);
  filter.addWords(...badWordList);
  const onAdd = (tag: Tag) => {
    tag.name = tag.name.charAt(0).toUpperCase() + tag.name.substring(1);
    props.onAdd(tag);
  };
  const {performRequest, error, setError} = usePerformRequest();
  useEffect(() => setError(false), [props.tags]);
  useEffect(() => {
    if (mes === 'success' && editing)
      setClassName('enabled success');
    else if (mes === 'success' && !editing)
      setClassName('disabled success');
    else if (mes === 'display-only')
      setClassName('display-only disabled');
    else if (mes === 'display-only expanded')
      setClassName('display-only expanded disabled');
    else if (!editing)
      setClassName('disabled');
    else
      setClassName('enabled');
  }, [mes, editing]);

  function onValidate(tag: Tag) {
    let newInvalid = '';
    if(filter.isProfane(tag.name))
      newInvalid = 'a tag cannot contains profane words.';
    else if(tag.name.length > 32)
      newInvalid = 'a tag cannot be more than 32 characters.';
    else if(!(/^[a-zA-Z0-9-]*$/.test(tag.name)))
      newInvalid = 'a tag can only use letters and numbers and dashes, no spaces.';
    tags.forEach(t => {
      if (t.name === formatTag(tag)) newInvalid = 'This tag already exists.';
    });
    setInvalid(newInvalid);
    return !newInvalid;
  }

  async function onInput(input: string) {
    if(props.onInput)
      props.onInput(input);
    if(input.trim().length === 0)
      return;
    const onSearchFunc = onSearch ? onSearch : getTags;
    await performRequest(async () => setTagSuggestions(await onSearchFunc(input)));
  }

  const classNames: ClassNames = {
    root: 'react-tags',
    rootFocused: 'is-focused',
    selected: 'react-tags-selected',
    selectedTag: 'react-tags-selected-tag',
    selectedTagName: 'react-tags-selected-tag-name',
    search: 'react-tags-search',
    searchInput: 'react-tags-search-input',
    suggestions: 'react-tags-suggestions',
    suggestionActive: 'is-active',
    suggestionDisabled: 'is-disabled'
  };

  return (
    <div className={className}>
      {error && <Message state={{variant: 'danger', message: 'Failed to load tags'}} />}
      <ReactTags
        tags={tags}
        onAddition={onAdd}
        onDelete={onDelete}
        onInput={onInput}
        suggestions={tagSuggestions}
        allowNew={true}
        onValidate={onValidate}
        classNames={classNames}
      />
      {invalid && <Message state={{variant: 'danger', message: invalid}} />}
    </div>
  );
}
