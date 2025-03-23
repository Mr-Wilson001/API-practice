export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthPayload {
  userId: string;
  username: string;
}