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

  cats;
  regesterationCats = [];
  wanteddata;
  places;
  headerLoggedin;
  loggenfromlocalstorage;
  constructor(private placeService: PlacesService, private httpService: HttpServiceService, private router: Router) {

    this.httpService.gettingData().subscribe(
      data => {
        this.cats = data;
        // console.log("heeeeeeeeeeeere")
        // console.log(this.cats)

        for (let regstCat of this.cats) {
          // console.log("inside for")
          if (regstCat.reservation == "true") {
            this.regesterationCats.push(regstCat);
            // console.log("inside if")
          }
        }

      }
    )

    // console.log(this.cats)

    this.httpService.gettingPlaces().subscribe(data => {
      this.places = data;
      // console.log(this.places)
    })

    this.loggenfromlocalstorage = this.httpService.getData("loggedin")
    // console.log("heeeeeeello")
    // console.log(this.loggenfromlocalstorage)

  }

  ngOnInit() {
    // this.cats=this.placeService.obj.categories;
    this.httpService.headerProfile.subscribe(data => { ///object behavior
      this.headerLoggedin = data;
    })

    // search input toggle:
     
    $('#searchBtn').click(function(){
      $('.form-control').toggle()
    })


  }

  loggingOut() {
    this.headerLoggedin = false;
    localStorage.clear();
    this.httpService.setData("loggedin", false);
    this.loggenfromlocalstorage = this.httpService.getData("loggedin");
    this.router.navigate(["/"]);

  }
  lowerPlaceSearch;
  lowerPlaceData;

  handlingSearch(inputVal) {
    inputVal.value = "";
    this.wanteddata = [];
  }
  lookingFor(event) {
    this.wanteddata = [];
    for (let i = 0; i < this.places.length; i++) {
      this.lowerPlaceSearch = event.target.value.toLowerCase();
      this.lowerPlaceData = this.places[i].name.toLowerCase();

      if (this.lowerPlaceData.includes(this.lowerPlaceSearch) && event.target.value.length !== 0)
      // || ( this.places[i].location.includes(event.target.value) && event.target.value.length!==0 )
      {

        this.wanteddata.push(this.places[i])
      }
    }
    // console.log(this.wanteddata)
  }
}


