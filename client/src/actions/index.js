import { SAVE_TOKEN, LOG_OUT } from './types';

export const saveToken = (token, refresh_token, athlete) => ({ type: SAVE_TOKEN, token, refresh_token, athlete});
export const logOut = () => ({ type: LOG_OUT });


