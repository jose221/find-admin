import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  profileDoc: AngularFirestoreDocument<any>;
  constructor(private afs: AngularFirestore) {}

  getMyUser(email) {
    this.profileDoc = this.afs.collection('users').doc(email);
  }

  addChildren(email, value) {
    return new Promise((resolve, reject) => {
      this.afs.collection('users').doc(email).collection('children').doc(value.id).set(value).then(
        data => {
          console.log('Exito');
          console.log(data);
          resolve();
        }, err => {
          console.log(err);
          reject();
        }
      );
    });
  }

}
