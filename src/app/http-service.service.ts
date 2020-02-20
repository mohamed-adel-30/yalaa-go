import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private headerProfileBehaviour = new BehaviorSubject(null)
  headerProfile = this.headerProfileBehaviour.asObservable();

  displayProfileIcon(loggedinparam) {
    this.headerProfileBehaviour.next(loggedinparam);
    console.log("hello from service")
    console.log(loggedinparam)
  }

  constructor(private http: HttpClient) { }


  postComments(body, header) {
    return this.http.post("http://localhost:3000/comments", body, header)
  }

  gettingData() {
    return this.http.get("http://localhost:3000/categories");
  }

  gettingPlaces() {
    return this.http.get("http://localhost:3000/places");
  }

  gettingUsers() {
    return this.http.get("http://localhost:3000/users");
  }
  gettingPtions() {
    return this.http.get("http://localhost:3000/options");
  }

  getSingleCategory(id) {
    return this.http.get("http://localhost:3000/categories/" + id);
  }


  getComments() {
    return this.http.get("http://localhost:3000/comments")
  }

  getRates() {
    return this.http.get("http://localhost:3000/rates");
  }
  // id bata3 object el fav nfso??

  getFav() {
    return this.http.get("http://localhost:3000/favourites");
  }

  deleteFav(id) {
    return this.http.delete("http://localhost:3000/favourites/" + id)
  }

  postFav(body, headers) {
    return this.http.post("http://localhost:3000/favourites", body, headers);
  }

  postHistory(body, headers) {
    return this.http.post("http://localhost:3000/history", body, headers);
  }


  postComment(body, headers) {
    return this.http.post("http://localhost:3000/comments", body, headers);
  }

  postRate(body, headers) {
    return this.http.post("http://localhost:3000/rates", body, headers);
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
