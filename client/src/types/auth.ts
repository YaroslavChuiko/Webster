export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  email: string;
}
