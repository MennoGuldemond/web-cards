export class User implements IUser {
  recipeIds: string[];
  createdOn: any;
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;

  constructor(userData: any) {
    this.uid = userData.uid;
    this.email = userData.email;
    this.photoURL = userData.photoURL;
    this.displayName = userData.displayName;
  }
}

export class GoogleUser implements IUser {
  constructor(userData: any) {
    this.uid = userData.uid;
    this.email = userData.email;
    this.photoURL = userData.photoURL;
    this.displayName = userData.displayName;
  }

  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

export interface IUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
