import { IValidateReturn } from './IValidate.interface';

export interface RequestWithUser {
  Request;
  user: IValidateReturn;
}
