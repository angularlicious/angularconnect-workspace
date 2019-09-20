import { Roles } from './roles.model';
import * as firebase from 'firebase';

export class User implements firebase.UserInfo {
  phoneNumber: string;
  providerId: string;
  // dateCreated: Date;
  // dateUpdated: Date;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  roles: Roles;
}
