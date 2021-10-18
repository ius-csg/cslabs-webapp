import React, {useEffect, useState} from 'react';
import ReactTags, {Tag} from 'react-tag-autocomplete';
import {} from './TagEditor.scss';

interface Props {
  tags: Tag[];
  tagSuggestions: Tag[];
  mes: string | undefined;
  editing: boolean;
  onAdd(tag: Tag): void;
  onDelete(i: number): void;
  onInput(name: string): void;
}

export function TagEditor({tags, tagSuggestions, onInput, onAdd, onDelete, mes, editing}: Props) {
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
      />
    </div>
  );
}
