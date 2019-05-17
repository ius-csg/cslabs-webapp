import {WebState} from '../types/WebState';

export const getWindowWidth = (state: WebState) => state.browser.windowSize.width;
export const getWindowHeight = (state: WebState) => state.browser.windowSize.height;
