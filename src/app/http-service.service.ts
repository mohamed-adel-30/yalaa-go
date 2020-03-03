import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  //behavior subjects
  private headerProfileBehaviour = new BehaviorSubject(null)
  headerProfile = this.headerProfileBehaviour.asObservable();

  private headerProfileBehaviourowner = new BehaviorSubject(null)
  headerProfileowner = this.headerProfileBehaviourowner.asObservable();


  private notificationCounterBehavior = new BehaviorSubject(0);
  notificationCounter = this.notificationCounterBehavior.asObservable();
  //behavior subject functions
  getNotifivations(l) {
    this.notificationCounterBehavior.next(l);
  }


  displayProfileIcon(loggedinparam) {
    this.headerProfileBehaviour.next(loggedinparam);
  }

  displayProfileIconToOwner(loggedinparamowner) {
    this.headerProfileBehaviourowner.next(loggedinparamowner);

  }


  constructor(private http: HttpClient) { }
  ////getting owner data

  getownerdata() {
    return this.http.get("http://localhost:3000/owners");
  }

  postownerdata(body, header) {
    return this.http.post("http://localhost:3000/owners", body, header);
  }

  ///requests of user
  paddUser(body, header) {
    return this.http.post("http://localhost:3000/users", body, header)
  }
  getSingleUser(id) {
    return this.http.get("http://localhost:3000/users/" + id);
  }


  gettingUsers() {
    return this.http.get("http://localhost:3000/users");
  }
  updateUserData(id, body, headers) {
    return this.http.put("http://localhost:3000/users/" + id, body, headers);
  }


  ///catgories requests
  gettingData() {
    return this.http.get("http://localhost:3000/categories");
  }
  // ....places.....///
  gettingPlaces() {
    return this.http.get("http://localhost:3000/places");
  }
  postPlaces(body, header) {
    return this.http.post("http://localhost:3000/places", body, header)
  }
  PutPlaces(id, body, header) {
    return this.http.put("http://localhost:3000/places/" + id, body, header)
  }

  getSinglePlace(id) {
    return this.http.get("http://localhost:3000/places/" + id);
  }



  // ..............options............/////
  PutOptions(id, body, header) {
    return this.http.put("http://localhost:3000/options/" + id, body, header)
  }


  gettingPtions() {
    return this.http.get("http://localhost:3000/options");
  }
  postOptions(body, header) {
    return this.http.post("http://localhost:3000/options", body, header)
  }
  deleteOption(id) {
    return this.http.delete("http://localhost:3000/options/" + id)
  }



  getSingleCategory(id) {
    return this.http.get("http://localhost:3000/categories/" + id);
  }

  /////comments requests

  postComments(body, header) {
    return this.http.post("http://localhost:3000/comments", body, header)
  }
  getSingleComments(id) {
    return this.http.get("http://localhost:3000/comments/" + id)
  }

  getComments() {
    return this.http.get("http://localhost:3000/comments")
  }

  deleteComments(id) {
    return this.http.delete("http://localhost:3000/comments/" + id)
  }

  editComment(id, body, header) {
    return this.http.put("http://localhost:3000/comments/" + id, body, header)
  }
  postComment(body, headers) {
    return this.http.post("http://localhost:3000/comments", body, headers);
  }

  // ............................................///
  // rates....//
  getRates() {
    return this.http.get("http://localhost:3000/rates");
  }

  updateRate(id, body) {
    return this.http.put("http://localhost:3000/rates/" + id, body);
  }


  postRate(body) {
    return this.http.post("http://localhost:3000/rates", body);
  }

  updatePlaceAvgRate(id, body) {
    return this.http.put("http://localhost:3000/places/" + id, body);
  }


  // ...........favourites...............///
  getFav() {
    return this.http.get("http://localhost:3000/favourites");
  }


  deleteFav(id) {
    return this.http.delete("http://localhost:3000/favourites/" + id)
  }

  postFav(body, headers) {
    return this.http.post("http://localhost:3000/favourites", body, headers);
  }


  // ..................history reservaions................///
  postHistory(body, headers) {
    return this.http.post("http://localhost:3000/history", body, headers);
  }

  getHistroy() {
    return this.http.get("http://localhost:3000/history");
  }
  PutHistory(id, body, headers) {
    return this.http.put("http://localhost:3000/history/" + id, body, headers);
  }
  deleteHistory(id) {
    return this.http.delete("http://localhost:3000/history/" + id)
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