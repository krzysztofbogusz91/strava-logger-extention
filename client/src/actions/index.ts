import { SAVE_TOKEN, LOG_OUT } from './types';
import { User } from '../interfaces/user.model';

export const saveToken = (token: string, refresh_token: string, athlete: User | null) => ({ type: SAVE_TOKEN, token, refresh_token, athlete});
export const logOut = () => ({ type: LOG_OUT });


