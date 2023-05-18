interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
}

interface LoginSuccessAction {
  type: 'LOGIN_SUCCESS';
  payload: { token: string };
}

interface LogoutAction {
  type: 'LOGOUT';
}

interface LoginFailAction {
  type: 'LOGIN_FAIL';
  payload: { error: string };
}

type AuthAction = LoginSuccessAction | LogoutAction | LoginFailAction;

const authReducer = (
  state: AuthState = { token: null, isLoggedIn: false, error: null },
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { token: action.payload.token, isLoggedIn: true, error: null };
    case 'LOGOUT':
      return { token: null, isLoggedIn: false, error: null };
    case 'LOGIN_FAIL':
      return { token: null, isLoggedIn: false, error: action.payload.error };
    default:
      return state;
  }
};

export const loginSuccess = (token: string): LoginSuccessAction => ({
  type: 'LOGIN_SUCCESS',
  payload: { token },
});

export const logout = (): LogoutAction => ({
  type: 'LOGOUT',
});

export const loginFail = (error: string): LoginFailAction => ({
  type: 'LOGIN_FAIL',
  payload: { error },
});

export default authReducer;
