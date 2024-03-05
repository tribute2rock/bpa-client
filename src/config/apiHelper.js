import store from '../redux/configureStore';
import { logout } from '../redux/user/userSlice';

function getAuthorizationToken() {
  let state = JSON.parse(localStorage.getItem('persist:gtech'));
  return select(state ? state : null);
}

function select(state) {
  if (state) {
    const user = JSON.parse(state.user);
    return user.data.accessToken;
  }
  return null;
}

function removeToken() {
  store.dispatch(logout());
  window.location.href = '/';
}

function getHeaderConfig() {
  return {
    headers: {
      Authorization: 'Bearer ' + getAuthorizationToken()
    }
  };
}

export { getAuthorizationToken, getHeaderConfig, removeToken };
