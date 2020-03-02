import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userlogin;
  ownerlogin;
  constructor() { }

  isUserAuthenticated() {
    this.userlogin = this.getData("loggedin")

    if (this.userlogin == []) {
      this.userlogin = false;
    }
    return this.userlogin;

  }
  isOwnerAuthenticated() {
    this.ownerlogin = this.getData("ownerloggedin")

    if (this.ownerlogin == []) {
      this.ownerlogin = false;
    }
    return this.ownerlogin;

  }


  // ...........general geters and getters functions from session storge...............//
  setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getData(key) {
    if (!JSON.parse(localStorage.getItem(key))) {
      return []
    }
    else {

      return JSON.parse(localStorage.getItem(key))
    }
  }
}
