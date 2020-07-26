interface AuthStravaModel {
  access_token: string;
  athlete: any;
  refresh_token: string;
}

export const getAuthFromLS = () => {
  const auth = localStorage.getItem('auth');
  
  return !!auth ? JSON.parse(auth) : false;
}

export const setAuthInLS = (auth: AuthStravaModel) => {
  localStorage.removeItem('auth');
  localStorage.setItem('auth', JSON.stringify(auth));
}

export const clearAuthInLS = () => {
  localStorage.removeItem('auth');
}