import { Door } from "../doors/doors.entity";
import { UserModel } from "../users/users.interface";

export interface TagRequestAnswer {
  userId: number;
  userTag: string;
  hasPackage: boolean;
  packageDoors?: number[];
}

export interface DoorRequestDto {
  userId: number;
  size: string;
}

export interface DoorResponse {
  packageId: number;
  doorId: number;
  doorNumber: number;
}

export interface LoginDto {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: Omit<UserModel, 'password'>;
}

export type DoorsListResponse = Door & {
  user?: UserModel;
}