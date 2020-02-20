import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { HttpServiceService } from '../http-service.service'


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  places;
  singlePlace; 0
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


  constructor(private route: ActivatedRoute, private placeService: PlacesService, private httpService: HttpServiceService, private router: Router) {

    this.route.params.subscribe((param: Params) => {
      this.singlePlaceId = param["id"];
      this.user = this.httpService.getData("user");

      this.httpService.gettingPlaces().subscribe(

        data => {
          this.places = data;
          this.singlePlaceData = this.getSingleSpesifcPlace(this.singlePlaceId);

        }
      )

      this.httpService.gettingPtions().subscribe(data => {
        this.options = data;
        this.gettingSpesifcOptions(this.singlePlaceId)
      })

      this.httpService.getFav().subscribe(data => {
        this.favs = data;
        this.gettingSpesificOfFavs()
      })


    })
    this.placeLoggedin = this.httpService.getData("loggedin");
    this.placeService.totalService.subscribe(data => {
      this.finalTotal = data;

    })
  }

  ngOnInit() {

    this.finalTotal = 0;
  }



  savingSelectedGames() {
    console.log("heeeeeeeeeeeello");
    console.log(this.placeService.arrOfGames)
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
    //  awl ma render el page bayshof hawa mawgod wala la?
    for (let fav of this.favs) {
      // console.log("na gawaaaaa el for")
      if (fav.placeId == this.singlePlaceId && fav.userId == this.user.id) {
        //da bta3 el2lwan 3shan yab2a a7mr
        this.checkFav = true;
        this.spesifcFavId = fav.id;
        // console.log("na gawaaaaa el if")
        // lw mawgod hasglha fi el local storge lw msh mwgod 5alas
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
      // console.log("22222222222222222")
      this.spesifcFavId = this.httpService.getData("favid")
      this.httpService.deleteFav(this.spesifcFavId).subscribe(data => {
        // console.log("deleted")
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
          // console.log(data)
          this.checkFav = true;
          // this.gettingSpesificOfFavs()
          this.httpService.getFav().subscribe(data => {
            this.favs = data;
            this.gettingSpesificOfFavs()
          })


          // console.log("1111111111111111111111111")

        }
      )
    }
    else {
      alert("you have to register")
      this.router.navigate(["/register"])
    }
  }




}
