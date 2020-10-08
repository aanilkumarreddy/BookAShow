import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from '@firebase/app';
import '@firebase/auth';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isBrowser = false;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, @Inject(PLATFORM_ID) platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  loginWithGoogle(): any {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return this.afAuth
      .signInWithPopup(provider)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  loginWithEmail(email: string, password: string): any {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  signupWithEmail(email: string, password: string, displayname: string): any {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return this.updateDisplayName(res.user, displayname);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  updateDisplayName(userData, displayName): Promise<any> {
    if (userData) {
      return userData.updateProfile({
        displayName,
      });
    }
    return Promise.reject(null);
  }

  // updateUserEmail(userData, email): void {
  //   if (userData) {
  //     userData.user
  //       .updateEmail('anil@gmail.com')
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     // this.fetchCurrentUser(email);
  //   }
  // }

  fetchCurrentUser(): any {
    return this.afAuth.authState.subscribe(
      (userData) => {
        return userData;
      },
      (error) => {
        console.log(error);
        return error;
      },
    );
  }

  logout(): any {
    this.afAuth
      .signOut()
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  updateMobileNum(mobileNum, userId): Promise<any> {
    return this.db
      .object('users/' + userId)
      .update({
        mobile: mobileNum,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  forgotPassword(email: string): any {
    let url = '';
    if (this.isBrowser) {
      url = window.location.origin;
    }
    return this.afAuth
      .sendPasswordResetEmail(email, {
        url,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
