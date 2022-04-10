import BadWordsFilter from 'bad-words';

export function loadFilter() {
  const BadWordList: string[] = require('badwords-list/lib/array');
  const filter = new BadWordsFilter();
  filter.addWords(...BadWordList);
  return filter;
}
