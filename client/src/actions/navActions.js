import { TITLE, BAR_OPEN, BAR_CLOSE } from './Types';

// Open Navigation Bar
export const openBar = () => ({ type: BAR_OPEN });

// Close Navigation Bar
export const closeBar = () => ({ type: BAR_CLOSE });

// Set page title
export const setTitle = (title) => ({ type: TITLE, payload: title });
