import { SAVE_TOKEN } from '../actions/types';

export const initialState = {
  token: '',
  refresh_token: '',
};
const AppStore = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      console.log('saving token', action.payload)
      return ({
        ...state,
        token: action.payload.token
      });
    default:
      return state;
  }
};

export default AppStore;
