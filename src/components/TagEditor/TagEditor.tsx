import React, {useEffect, useState} from 'react';
import ReactTags, {Tag, ClassNames} from 'react-tag-autocomplete';
import styles from './TagEditor.module.scss';
import {usePerformRequest} from '../../util/usePerformRequest';
import {getTags} from '../../api';
import {Message} from '../../util/Message';
import BadWordsFilter from 'bad-words';
import {loadFilter} from '../util/BadwordsFilter';
import {doNothing} from '../util/Util';
import {classes} from '../../util';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faWindowClose} from '@fortawesome/free-solid-svg-icons';

interface Props {
  tags: Tag[];
  editable?: boolean;
  readonly?: boolean;
  expanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
  hideIcon?: boolean;
  onAdd?(tag: Tag): void;
  onSearch?(term: string): Tag[];
  onDelete?(i: number): void;
  onInput?(name: string): void;
}

const formatTag = (tag: Tag) => tag.name.charAt(0).toUpperCase() + tag.name.substring(1);

export function TagEditor(props: Props) {
  const {tags, onSearch, onDelete, editable, readonly, expanded, setExpanded, hideIcon} = props;
  const [invalid, setInvalid] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([]);
  const [filter] = useState<BadWordsFilter>(() => loadFilter());
  const onAdd = (tag: Tag) => {
    tag.name = formatTag(tag);
    if(props.onAdd)
      props.onAdd(tag);
  };
  const {performRequest, error, setError} = usePerformRequest();
  useEffect(() => setError(false), [props.tags]);
  const className =  editable
    ? styles['editable']
    : classes(styles['disabled'], readonly && styles['read-only'], expanded && styles['expanded']);

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
    root: styles['react-tags'],
    rootFocused: styles['is-focused'],
    selected: styles['react-tags-selected'],
    selectedTag: styles['react-tags-selected-tag'],
    selectedTagName: 'react-tags-selected-tag-name',
    search: styles['react-tags-search'],
    searchInput: styles['react-tags-search-input'],
    suggestions: styles['react-tags-suggestions'],
    suggestionActive: 'is-active',
    suggestionDisabled: 'is-disabled'
  };

  return (
    <div className={className}>
      {error && <Message state={{variant: 'danger', message: 'Failed to load tags'}} />}
      <ReactTags
        tags={tags}
        onAddition={onAdd}
        onDelete={onDelete ?? doNothing}
        onInput={onInput}
        suggestions={tagSuggestions}
        allowNew={true}
        onValidate={onValidate}
        classNames={classNames}
      />
      { !hideIcon && readonly &&
        <FontAwesomeIcon
          icon={expanded ? faWindowClose : faEllipsisH}
          style={{display: 'inline', cursor: 'pointer', position: 'relative', top: 4, color: '#868e96'}}
          onClick={() => setExpanded && setExpanded(!expanded)}
        />
      }
      {invalid && <Message state={{variant: 'danger', message: invalid}} />}
    </div>
  );
}
