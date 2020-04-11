/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_URL: string;
    REACT_APP_FAST_TEST_URL?: string;
    REACT_APP_FAST_FULL_URL?: string;
  }
}
