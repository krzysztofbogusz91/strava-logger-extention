import { SAVE_TOKEN, LOG_OUT } from '../actions/types';
import { User } from '../interfaces/user.model';

export interface StoreInterface {
  athlete: User | null;
  token: string;
  refresh_token: string;
}

export const initialState: StoreInterface = {
  athlete: null,
  token: '',
  refresh_token: '',
};

const AppStore = (state: StoreInterface = initialState, action: any) => {
  switch (action.type) {

    case SAVE_TOKEN:
      return ({
        ...state,
        token: action.token,
        refresh_token: action.refresh_token,
        athlete: action.athlete
      });

    case LOG_OUT:
      return ({
        ...state,
        token: null,
        refresh_token: null,
        athlete: null
      });
    default:
      return state;
  }
};

export default AppStore;
