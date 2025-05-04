export interface UserPayload {
  sub: string;
  email: string;
  role: 'admin' | 'user';
}
