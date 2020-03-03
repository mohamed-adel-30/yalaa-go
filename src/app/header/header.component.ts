import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { HttpServiceService } from '../http-service.service'
import { Router } from '@angular/router';
import * as $ from 'jquery';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  error = null;
  cats;
  regesterationCats = [];
  wanteddata;
  places;
  headerLoggedin;
  loggenfromlocalstorage;
  loggenfromlocalstorageOwner;
  ownerloggedinheader;
  notifications = 0;
  user;
  histroy;
  ownerHistory = [];
  alertArr = [];
  owenerplace;
  owner;
  lowerPlaceSearch;
  lowerPlaceData;
  constructor(private placeService: PlacesService, private httpService: HttpServiceService, private router: Router) {
    this.user = this.httpService.getData("user");
    this.httpService.gettingData().subscribe(
      data => {
        this.cats = data;

        for (let regstCat of this.cats) {

          if (regstCat.reservation == "true") {
            this.regesterationCats.push(regstCat);

          }
        }

      }
      , error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)
        this.router.navigate(["/error"])
      })



    this.httpService.gettingPlaces().subscribe(data => {
      this.places = data;
    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })


    this.loggenfromlocalstorage = this.httpService.getData("loggedin");
    this.loggenfromlocalstorageOwner = this.httpService.getData("ownerloggedin");

  }


  ngOnInit() {
    // da 3shan yasm3 fi s3thaaaaaaaa
    this.httpService.headerProfile.subscribe(data => { ///object behavior
      this.headerLoggedin = data;
    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })

    this.httpService.headerProfileowner.subscribe(data => { ///object behavior
      this.ownerloggedinheader = data;
    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })
    // search input toggle:

    $('#searchBtn').click(function () {
      $('.control-header').toggle()
    })
    this.httpService.notificationCounter.subscribe(data => {
      this.notifications = data;
    })

    // ...............................test notifications...//

    this.owner = this.httpService.getData("owneruser");
    this.httpService.gettingPlaces().subscribe(data => {
      this.places = data;
      for (let place of this.places) {

        if (place.ownerId == this.owner.id) {
          this.owenerplace = place;
          break;
        }
      }

      this.httpService.getHistroy().subscribe(data => {
        this.histroy = data;
        this.ownerHistory = []
        for (let i of this.histroy) {
          if (i.reservedGame[0].placeId == this.owenerplace.id) {
            this.ownerHistory.push(i);
          }
        }
        console.log("hiiiiiiiiiiiiistroy")
        console.log(data)
        console.log(this.ownerHistory)
        this.alertArr = []
        for (let i of this.ownerHistory) {
          if (i.state == false) {
            this.alertArr.push(i);
          }

        }
        this.httpService.getNotifivations(this.alertArr.length)
      })


    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })


    // .....................................................///



  }

  loggingOut() {
    this.headerLoggedin = false;
    this.ownerloggedinheader = false;
    localStorage.clear();
    this.httpService.setData("loggedin", false);
    this.httpService.setData("ownerloggedin", false);
    this.loggenfromlocalstorage = this.httpService.getData("loggedin");
    this.loggenfromlocalstorageOwner = this.httpService.getData("ownerloggedin")
    this.router.navigate(["/"]);

  }


  handlingSearch(inputVal) {
    inputVal.value = "";
    this.wanteddata = [];
  }
  lookingFor(event) {
    this.wanteddata = [];
    // .....hangeb el places hena tany //?
    this.httpService.gettingPlaces().subscribe(data => {
      this.places = data;

      for (let i = 0; i < this.places.length; i++) {
        this.lowerPlaceSearch = event.target.value.toLowerCase();
        this.lowerPlaceData = this.places[i].name.toLowerCase();

        if (this.lowerPlaceData.includes(this.lowerPlaceSearch) && event.target.value.length !== 0)
        // || ( this.places[i].location.includes(event.target.value) && event.target.value.length!==0 )
        {

          this.wanteddata.push(this.places[i])
        }
      }

    })

    // console.log(this.wanteddata)
  }
  handlingError() {
    this.error = null;
  }


}


