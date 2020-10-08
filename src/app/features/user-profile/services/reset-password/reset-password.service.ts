import { Injectable } from '@angular/core';
import firebase from '@firebase/app';
import '@firebase/auth';

@Injectable()
export class ResetPasswordService {
  constructor() {}

  reauthenticateUser(userObj, email, password): any {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return userObj
      .reauthenticateWithCredential(credential)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  resetPassword(userObj, newPassword): any {
    return userObj
      .updatePassword(newPassword)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
