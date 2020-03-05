import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlacesService } from '../places.service';



interface Image {
  img: string;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // get placess
  places;
  singlePlace; 
  singlePlaceId;
  singlePlaceData;
// get placess
  // get options
  options;
  singleOptions; 
  singleOptionsId;
  singleOptionsData;
// get options
wanteddata
lowerPlaceSearch;
lowerPlaceData;
lowerPlaceDataLocation ;
  customOptions: OwlOptions = {

    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  slidesStor: Image[] = [
    { img: "./../../assets/Home/uriel-soberanes-MxVkWPiJALs-unsplash.png" },
    { img: "./../../assets/Home/uriel-soberanes-MxVkWPiJALs-unsplash.png" },





  ]

  log;
  usersdata;
  getuser;
  logged;
  userfromlocal
  constructor(private service: HttpServiceService, 
    private route: ActivatedRoute, private placeService: PlacesService,
    private router:Router) {
    this.route.params.subscribe((param: Params) => {
      // get placess data
      this.singlePlaceId = param["id"];
      this.singleOptionsId = param["id"];
      this.service.gettingPlaces().subscribe(

        data => {
          this.places = data;
          this.singlePlaceData = this.getSingleSpesifcPlace(this.singlePlaceId);
        }
      )
      this.service.gettingPtions().subscribe(

        data => {
          this.options = data;
          this.singleOptionsData = this.getSingleSpesifcOPtionse(this.singleOptionsId);
        }
      )

    // ...............................//

  })

  }
  ngOnInit() {

  }

  getSingleSpesifcPlace(id) {
    for (let i of this.places) {
      if (i.id == id) {
        this.singlePlace = i;
      }
    }

    return this.singlePlace;
  }

  getSingleSpesifcOPtionse(id) {
    for (let i of this.options) {
      if (i.id == id) {
        this.singleOptions = i
      }
    }

    return this.singleOptions;
  }
  navigateToId1(){this.router.navigate(['/place',1])}
  navigateToId2(){this.router.navigate(['/place',2])}
  navigateToId3(){this.router.navigate(['/place',10])}
  toCategory5(){this.router.navigate(['/cat',5])}
  toCategory8(){this.router.navigate(['/cat',8])}
  toCategory7(){this.router.navigate(['/cat',7])}
  toCategory9(){this.router.navigate(['/cat',9])}
  toCategory3(){this.router.navigate(['/cat',3])}
  toCategory4(){this.router.navigate(['/cat',4])}
  handlingSearch(inputVal) {
    inputVal.value = "";
    this.wanteddata = [];
  }
  lookingFor(event) {
    this.wanteddata = [];
    for (let i = 0; i < this.places.length; i++) {
      this.lowerPlaceSearch = event.target.value.toLowerCase();
      this.lowerPlaceData = this.places[i].name.toLowerCase();
      this.lowerPlaceDataLocation = this.places[i].location.toLowerCase();

      if ((this.lowerPlaceData.includes(this.lowerPlaceSearch) && event.target.value.length !== 0)
      || ( this.lowerPlaceDataLocation.includes(this.lowerPlaceSearch) && event.target.value.length!==0 ))
      {

        this.wanteddata.push(this.places[i])
      }
    }
    // console.log(this.wanteddata)
  }
}
