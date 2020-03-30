import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { HttpServiceService } from '../http-service.service'
import { MapsAPILoader } from '@agm/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlacesComponent implements OnInit {

  // ...................google map ..............///
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  geoCoder: any;
  // ...........................................///
  error = null;
  places;
  singlePlace;
  // ........///
  singlePlaceId;
  singlePlaceData; //obj
  // ........//
  placeLoggedin;
  options;
  optionsOfSpesificPlace = [];
  // ..................//
  checkFav: boolean = false;
  favs;
  user;
  spesifcFavId;
  loggin;
  // ........................///
  finalTotal;
  totalSingleGame;
  // ........................
  appear = false //appear section
  nearByPlacses = [];
  MAX3 = []

  constructor(private route: ActivatedRoute, private placeService: PlacesService, private httpService: HttpServiceService, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.loggin = this.httpService.getData("loggedin");

    this.route.params.subscribe((param: Params) => {
      this.singlePlaceId = param["id"];
      this.user = this.httpService.getData("user");

      this.httpService.gettingPlaces().subscribe(
        

        data => {
          this.places = data;
          this.singlePlaceData = this.getSingleSpesifcPlace(this.singlePlaceId);
          this.gettingNearByPlacses();
          this.latitude = this.singlePlaceData.lat;
          this.longitude = this.singlePlaceData.long;

        }
        
      )

      this.httpService.gettingPtions().subscribe(data => {
        this.optionsOfSpesificPlace = [];
        this.options = data;
        this.gettingSpesifcOptions(this.singlePlaceId)
      }, error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)
        this.router.navigate(["/error"])
      })
      this.optionsOfSpesificPlace = []

      this.httpService.getFav().subscribe(data => {
        this.favs = data;
        this.gettingSpesificOfFavs()
      }, error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)
        this.router.navigate(["/error"])
      })


    })
    this.placeLoggedin = this.httpService.getData("loggedin");
    this.placeService.totalService.subscribe(data => {
      this.finalTotal = data;

    })

  }

  ngOnInit() {


    this.finalTotal = 0;
    // .........google map......///

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
  }
  // google map functions..................////
  private setCurrentLocation() {
    if ('geolocation' in navigator) {

      this.zoom = 15;
    }
  }
  // ..........................///

  // start img slider code
  mainImg;
  leftArrow;
  rightArrow;
  onClick(img) {

    this.mainImg = document.getElementsByClassName('master-img2')[0]
    this.mainImg.src = img.src
    img.classList.add("selected");
    img.nextElementSibling.classList.remove('selected')
    img.previousElementSibling.classList.remove('selected');

    document.querySelectorAll(".thumb-img")[0].addEventListener('click', function () {
      document.querySelectorAll(".thumb-img")[2].classList.remove('selected')
    })
  }
  appearOptionSection() {
    this.appear = !this.appear
  }

  onLeftClick(leftArrow) {
    this.leftArrow = document.querySelector('.selected')
    this.leftArrow.previousElementSibling.click()
  }
  onRightClick(rightArrow) {
    this.rightArrow = document.querySelector('.selected')
    this.rightArrow.nextElementSibling.click()
  }
  // end img slider code



  savingSelectedGames() {

    this.loggin = this.httpService.getData("loggedin");
    if (this.loggin == true) {
      if (this.finalTotal != 0) {
        this.httpService.setData("finalTotal", this.finalTotal);
        this.httpService.setData("choosenGames", this.placeService.arrOfGames);
        this.finalTotal = 0;
        this.placeService.arrOfGames = [];
        this.router.navigate(["/reservation/FoYalaaPayment"])
      }


    }
    else {
      alert("you have to register");
      this.router.navigate(["/register"])
    }

  }





  gettingSpesificOfFavs() {
    //  check if this place is a favourite 
    for (let fav of this.favs) {
      if (fav.placeId == this.singlePlaceId && fav.userId == this.user.id) {
        //color checking
        this.checkFav = true;
        this.spesifcFavId = fav.id;
        // if it;s exites it will be stored in local storge
        this.httpService.setData("favid", this.spesifcFavId);
        break;
      }
    }

  }

  gettingSpesifcOptions(id) {
    for (let option of this.options) {
      if (option.placeId == id) {
        this.optionsOfSpesificPlace.push(option)
      }
    }
  }
  navigateToReservation() {
    if (this.placeLoggedin && this.placeLoggedin.length != 0) {
      this.router.navigate(["/reservation", this.singlePlaceData.id])
    }
    else {
      this.router.navigate(["/register"])
    }

  }


  getSingleSpesifcPlace(id) {

    for (let i of this.places) {
      if (i.id == id) {
        this.singlePlace = i;
      }
    }

    return this.singlePlace;
  }


  checkingFavs() {
    //lw kant mn el favs already 
    if (this.checkFav == true) {
      this.RemoveFromFavs()
    }
    // lw makntsh mn el fav hayro7 yo7tha?
    else {
      this.addToFavs()
    }
  }



  RemoveFromFavs() {
    this.placeLoggedin = this.httpService.getData("loggedin");
    if (this.placeLoggedin == true) {
      this.checkFav = false;

      this.spesifcFavId = this.httpService.getData("favid")
      this.httpService.deleteFav(this.spesifcFavId).subscribe(data => {

      }, error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)

        this.router.navigate(["/error"])
      })

    }

    else {
      alert("you have to register")
      this.router.navigate(["/register"])
    }

  }


  addToFavs() {
    this.placeLoggedin = this.httpService.getData("loggedin");

    if (this.placeLoggedin == true) {
      let headers = { "Conetent-Type": "application/json" }
      let body = {
        "placeId": this.singlePlaceId,
        "userId": this.user.id
      }
      this.httpService.postFav(body, headers).subscribe(
        data => {
          this.checkFav = true;
          this.httpService.getFav().subscribe(data => {
            this.favs = data;
            this.gettingSpesificOfFavs()
          })
        }
      )
    }
    else {
      alert("you have to register")
      this.router.navigate(["/register"])
    }
  }

  gettingNearByPlacses() {
    this.MAX3 = []
    this.nearByPlacses = [];
    for (let place of this.places) {
      if (place.location == this.singlePlaceData.location && place.id != this.singlePlaceData.id) {
        this.nearByPlacses.push(place)
      }
    }
    for (let i = 0; i < this.nearByPlacses.length; i++) {
      if (i == 3) {
        break;
      }
      else {
        this.MAX3.push(this.nearByPlacses[i])
      }
    }

  }


}
