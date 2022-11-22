export interface UserModel {
  userId: number;
  name: string;
  surname?: string;
  age: number;
  telephone?: string;
  email: string;
  password: string;
  admin: boolean;
  appNotification: boolean;
  emailNotification: boolean;
  intercomNotification: boolean;
  tagId: string;
}
