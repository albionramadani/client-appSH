import { UserModel } from './user-model';

export interface AuthenticatedModel {
  id: string;
  userData: UserModel;
  token: string;
  refreshToken: string;
  validUntil: Date;
}
