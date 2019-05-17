import {BrowserTypes} from '../types/actionTypes';

export const screenResize = (width: number, height: number) => (dispatch: any) => {
  dispatch({
    type: BrowserTypes.SCREEN_RESIZE,
    data: {windowSize: {width: width, height: height }}
  });
};

export const initBrowser = () => (dispatch: any) => {
  dispatch(screenResize(window.innerWidth, window.innerHeight));
  window.addEventListener('resize', () => dispatch(screenResize(window.innerWidth, window.innerHeight)));
};
