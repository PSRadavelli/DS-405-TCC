export interface UserModel {
  userId: number;
  name: string;
  surname?: string;
  age: number;
  telephone?: string;
  admin: boolean;
  appNotification: boolean;
  emailNotification: boolean;
  intercomNotification: boolean;
}
