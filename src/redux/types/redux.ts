import {Action as ReduxAction} from 'redux';

export default interface Action<T = any, D = any> extends ReduxAction<T> {
  type: T;
  data: D;
}
