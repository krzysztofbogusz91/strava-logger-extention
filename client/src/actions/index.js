import { SAVE_TOKEN } from './types';

export const saveToken = (token, refresh_token, athlete) => ({ type: SAVE_TOKEN, token, refresh_token, athlete});


