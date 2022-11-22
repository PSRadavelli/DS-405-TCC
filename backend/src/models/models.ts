import { UserModel } from '../users/users.interface';

export interface TagRequestAnswer {
  userId: number;
  userTag: string;
  hasPackage: boolean;
  packageDoors?: number[];
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: Omit<UserModel, 'password'>;
}