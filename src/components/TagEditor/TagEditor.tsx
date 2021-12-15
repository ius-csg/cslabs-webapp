import React, {useEffect, useState} from 'react';
import ReactTags, {Tag, ClassNames} from 'react-tag-autocomplete';
import {} from './TagEditor.scss';

interface Props {
  tags: Tag[];
  tagSuggestions: Tag[];
  mes?: string;
  editing: boolean;
  classNames?: any;
  onAdd(tag: Tag): void;
  onDelete(i: number): void;
  onInput(name: string): void;
}

export function TagEditor({tags, tagSuggestions, onInput, onAdd, onDelete, mes, editing, classNames}: Props) {
  const [className, setClassName] = useState('disabled');

  useEffect(() => {
    if (mes === 'success' && editing)
      setClassName('enabled success');
    else if (mes === 'success' && !editing)
      setClassName('disabled success');
    else if (!editing)
      setClassName('disabled');
    else
      setClassName('enabled');
  }, [mes, editing]);

  function onValidate(tag: Tag) {
    let valid = true;
    tags.forEach(t => {if (t.name === tag.name) valid = false;});
    return valid;
  }

  const defaultClassNames: ClassNames = {
    root: classNames?.root || 'react-tags',
    rootFocused: classNames?.rootFocused || 'is-focused',
    selected: classNames?.selected || 'react-tags-selected',
    selectedTag: classNames?.selectedTag || 'react-tags-selected-tag',
    selectedTagName: classNames?.selectedTagName || 'react-tags-selected-tag-name',
    search: classNames?.search || 'react-tags-search',
    searchInput: classNames?.searchInput || 'react-tags-search-input',
    suggestions: classNames?.suggestions || 'react-tags-suggestions',
    suggestionActive: classNames?.suggestionActive || 'is-active',
    suggestionDisabled: classNames?.suggestionDisabled || 'is-disabled'
  };

  return (
    <div className={className}>
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
