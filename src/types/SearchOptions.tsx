import {Tag} from 'react-tag-autocomplete';
import {Entity} from './Entity';
import {ModuleDifficulty} from './Module';

export interface SearchOptions extends Entity {
    title: string;
    description: string;
    difficulty: ModuleDifficulty;
    tags: Tag[];
}
