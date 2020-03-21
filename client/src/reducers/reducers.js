import { SAVE_TOKEN } from '../actions/types';

export const initialState = {
  athlete: '',
  token: '',
  refresh_token: '',
};
const AppStore = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return ({
        ...state,
        token: action.token,
        refresh_token: action.refresh_token,
        athlete: action.athlete
      });
    default:
      return state;
  }
};

export default AppStore;
