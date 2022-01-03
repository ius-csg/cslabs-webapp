import React, {useEffect, useState} from 'react';
import ReactTags, {Tag, ClassNames} from 'react-tag-autocomplete';
import {} from './TagEditor.scss';

export interface Props {
  tags: Tag[];
  tagSuggestions?: Tag[];
  mes?: string;
  editing: boolean;
  classNames?: any;
  onAdd(tag: Tag): void;
  onDelete(i: number): void;
  onInput?(name: string): void;
}

export function TagEditor({tags, tagSuggestions, onInput, onAdd, onDelete, mes, editing, classNames}: Props) {
  const [status, setStatus] = useState('disabled');

  useEffect(() => {
    if (mes === 'success' && editing)
      setStatus('enabled success');
    else if (mes === 'success' && !editing)
      setStatus('disabled success');
    else if (!editing)
      setStatus('disabled');
    else
      setStatus('enabled');
  }, [mes, editing]);

  function onValidate(tag: Tag) {
    let valid = true;
    tags.forEach(t => {if (t.name === tag.name) valid = false;});
    return valid;
  }

  const defaultClassNames: ClassNames = {
    // add any additional CSS class names defined in props to existing classes
    root: `react-tags ${classNames?.root? classNames.root : ''}`,
    rootFocused: `is-focused ${classNames?.rootFocused? classNames.rootFocused : ''}`,
    selected: `react-tags-selected ${classNames?.selected? classNames.selected : ''}`,
    selectedTag: `react-tags-selected-tag ${classNames?.selectedTag? classNames.selectedTag : ''}`,
    selectedTagName: `react-tags-selected-tag-name ${classNames?.selectedTagName? classNames.selectedTagName : ''}`,
    search: `react-tags-search ${classNames?.search? classNames.search : ''}`,
    searchInput: `react-tags-search-input ${classNames?.searchInput? classNames.searchInput : ''}`,
    suggestions: `react-tags-suggestions ${classNames?.suggestions? classNames.suggestions : ''}`,
    suggestionActive: `is-active ${classNames?.suggestionActive? classNames.suggestionActive : ''}`,
    suggestionDisabled: `is-disabled ${classNames?.suggestionDisabled? classNames.suggestionDisbled : ''}`
  };
  return (
    <div className={status}>
      <ReactTags
        tags={tags}
        onAddition={onAdd}
        onDelete={onDelete}
        onInput={onInput}
        suggestions={tagSuggestions}
        allowNew={true}
        onValidate={onValidate}
        classNames={defaultClassNames}
      />
    </div>
  );
}
