import {ThunkAction} from 'redux-thunk';
import {WebState} from '../types/WebState';
import {AnyAction} from 'redux';

export type ThunkResult<R> = ThunkAction<R, WebState, undefined, AnyAction>;
