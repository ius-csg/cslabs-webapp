import {NavigationTypes} from '../types/actionTypes';

export const navigateToPage = (page: any) => ({
  type: NavigationTypes.NAVIGATE_TO_PAGE,
  data: page
});
