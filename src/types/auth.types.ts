export interface User {
  username: string;
  email: string;
  token: string;
}

export interface UserResponse {
  user: User;
}

export interface UpdateUserParams {
  username: string;
  email: string;
  password?: string;
}

export interface UserRequestParams {
  username: string;
  password: string;
}

export interface State {
  errors: any;
  user?: User;
  isAuthenticated: boolean;
}

export interface Credentials {
  username: string;
  password: string;
}
