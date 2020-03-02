import { UsersService } from '../users.service';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error = null;
  checker: boolean = true;
  userData;
  myForm: FormGroup;
  loggedinheader = false;

  @ViewChild("owner", { static: true }) owenerCheck: ElementRef;

  OwnerData;
  checkerowner = true;
  ownerloggedinheader = false;
  getuserowner;
  loggedowner;
  userfromlocalowner;
  // ...................///
  locationSelectedText;
  locationSelected;
  getuser;
  logged;
  userfromlocal;

  // ..............place details....................///
  fileData;
  imageSrc = "../../assets/Home/defaultPlace.png";
  imgs = ["../../assets/Home/defaultPlace.png", "../../assets/Home/defaultPlace.png", "../../assets/Home/defaultPlace.png"]

  statusOwner;
  reservationOwner;
  kidsOwner;
  statusOwnerText;
  reservationOwnerText;
  kidsOwnerText;
  placename = "";
  placecontact = "";
  placeaddres = "";
  placelocation = "";
  checkbox = false; //byashof hal hoa owener wala la
  chechDiv = true;
  placeDesc: any = "";
  openStart: any = "";
  openEnd: any = "";
  cats;

  // ........test cats.......///
  id;
  arrOfCats = [];
  celectedArr: any = [];
  owner2;

  places;
  locationsRepated = [];
  locationSet;
  locations;
  // .................................///
  constructor(private formBuilder: FormBuilder, private service: UsersService, private router: Router, private httpService: HttpServiceService) {


    this.httpService.gettingData().subscribe(data => {
      this.cats = data;

    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })

    this.httpService.gettingPlaces().subscribe(data => {
      this.places = data;

      for (let i of this.places) {
        this.locationsRepated.push(i.location)
      }
      this.locationSet = new Set(this.locationsRepated)
      this.locations = [...this.locationSet];
      console.log("dddddddddddddddddd")
      console.log(this.locations)
    })

  }


  ngOnInit() {

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]],
      // confirmEmail: ['', [Validators.required, Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{5,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{5,}$/)]]
    })

    this.service.getUsers().subscribe(data => {
      this.userData = data;

    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })

    this.httpService.getownerdata().subscribe(data => {
      this.OwnerData = data;
    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })


  }




  clickingCheckBox() {
    this.checkbox = this.owenerCheck.nativeElement.checked;
    if (this.checkbox == true) {
      for (let i of this.cats) {
        setTimeout(() => {
          this.id = document.getElementById(i.id);
          this.arrOfCats.push(this.id)

        }, 10)
      }
      this.chechDiv = false;

    } else {
      this.chechDiv = true;
    }

  }
  check(form: FormGroup) {
    // debugger
    for (let index = 0; index < this.userData.length; index++) {
      if (form.value.email === this.userData[index].email) {
        // console.log(this.userData[index].email);
        this.checker = false;
        break;
      }
      else {
        this.checker = true;
      }
    }

    return this.checker;
  }
  checkOwner(form: FormGroup) {
    // debugger
    for (let index = 0; index < this.OwnerData.length; index++) {
      if (form.value.email === this.OwnerData[index].email) {
        console.log(this.OwnerData[index].email);
        this.checkerowner = false;
        break;
      }
      else {
        this.checkerowner = true;
      }
    }

    return this.checkerowner;
  }


  obj;
  onSubmit(form) {

    if (this.owenerCheck.nativeElement.checked == false) {
      if (this.check(form)) {
        this.obj = {
          "name": form.value.name,
          "email": form.value.email,
          "password": form.value.password,
          "image": "",
          "visa": 0
        }
        let headers = { "Conetent-Type": "application/json" }
        // this.service.addUsers(this.obj)
        this.httpService.paddUser(this.obj, headers).subscribe(data => {
          this.router.navigate(["/"])
          localStorage.clear();
          this.obj.password = "********"
          this.httpService.setData("user", this.obj)
          this.httpService.setData("loggedin", true);
          this.loggedinheader = true;
          this.httpService.displayProfileIcon(this.loggedinheader)
          // ..............................//
          this.httpService.gettingUsers().subscribe(data => {
            this.getuser = data;

            this.logged = this.httpService.getData("loggedin")
            this.userfromlocal = this.httpService.getData("user")
            if (this.logged == true) {
              for (let i of this.getuser) {

                if (i.email == this.userfromlocal.email) {
                  i.password = "********"
                  this.httpService.setData("user", i)

                }
              }
            }
          })
        })
      }
      else {
        alert('found');
      }
    } else {
      if (this.checkOwner(form)) {
        this.obj = {
          "name": form.value.name,
          "email": form.value.email,
          "password": form.value.password
        }
        let headers = { "Conetent-Type": "application/json" }
        // this.service.addUsers(this.obj)
        this.httpService.postownerdata(this.obj, headers).subscribe(data => {

          this.router.navigate(["/"])
          localStorage.clear();
          this.obj.password = "********"
          this.httpService.setData("owneruser", this.obj)
          this.httpService.setData("ownerloggedin", true);
          this.loggedinheader = true;
          this.ownerloggedinheader = true;
          this.httpService.displayProfileIcon(this.loggedinheader)
          this.httpService.displayProfileIconToOwner(this.ownerloggedinheader)
          // ..............................//
          this.httpService.getownerdata().subscribe(data => {
            this.getuserowner = data;

            this.loggedowner = this.httpService.getData("ownerloggedin")
            this.userfromlocalowner = this.httpService.getData("owneruser")
            if (this.loggedowner == true) {
              for (let i of this.getuserowner) {

                if (i.email == this.userfromlocalowner.email) {
                  i.password = "********"
                  this.httpService.setData("owneruser", i);
                  this.owner2 = this.httpService.getData("owneruser");

                  break;

                }
              }

              this.addPlaceToThisOwner();
            }
          })



        })

      }
      else {
        alert('found');
      }
    }
  }

  // ..............place details....................///

  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    this.preview();
  }
  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    let reader;
    reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.imageSrc = reader.result;
      this.verfyingPlcae(this.placename, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
    }
  }

  gettingStatus(val) {
    this.statusOwner = val.srcElement.attributes.value.value;
    this.statusOwnerText = val.target.text;
    this.verfyingPlcae(this.placename, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
  }

  gettingLocations(val) {
    this.locationSelected = val.srcElement.attributes.value.value;
    this.locationSelectedText = val.target.text;
    this.verfyingPlcae(this.placename, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
  }
  gettingReservation(val) {
    this.reservationOwner = val.srcElement.attributes.value.value;
    this.reservationOwnerText = val.target.text;
    this.verfyingPlcae(this.placename, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)

  }
  gettingKidsArea(val) {
    this.kidsOwner = val.srcElement.attributes.value.value;
    this.kidsOwnerText = val.target.text;
    this.verfyingPlcae(this.placename, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
  }


  selectingCats() {
    this.celectedArr = [];
    for (let i of this.arrOfCats) {
      if (i.checked == true) {
        this.celectedArr.push(i.id)
      }
    }

    this.verfyingPlcae(this.placename, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
  }

  verfyingPlcae(placeNName, contact, address, desc, openHoursEnd, openHoursStart, state = true) {
    if (state == true) {
      this.placename = placeNName.value;
      this.placecontact = contact.value;
      this.placeaddres = address.value;
      this.placeDesc = desc.value;
      this.openStart = openHoursStart.value;
      this.openEnd = openHoursEnd.value;
    }
    // && this.imageSrc != "not yet"
    if (this.placename.length > 0
      && this.placecontact.length > 0 && +this.placecontact / 1 == +this.placecontact && this.placeaddres.length > 0 && this.placeDesc.length > 0
      && this.openStart.length > 0 && this.celectedArr.length != 0 && this.celectedArr.length <= 3 && this.openEnd
      && this.statusOwner && this.locationSelected && this.reservationOwner && this.kidsOwner) {

      this.chechDiv = true;
    }
    else {
      this.chechDiv = false;


    }

  }
  placeObj;
  // ........................t7der object el place...................//
  addPlaceToThisOwner() {

    let headers = { "Conetent-Type": "application/json" }
    this.placeObj = {
      "name": this.placename,
      "catId": this.celectedArr,
      "address": this.placeaddres,
      "location": this.locationSelectedText,
      "rates": [1, 2, 3, 4, 5],
      "paymentMethod": "Ticket",
      "avgrate": 5,
      "mainImage": this.imageSrc,
      "imgs": this.imgs,
      "status": this.statusOwner,
      "openHours": this.openStart + "to" + this.openEnd,
      "desc": this.placeDesc,
      "reservation": this.reservationOwner,
      "kid-friendly": this.kidsOwner,
      "contact": {
        "phone": this.placecontact,
        "facebook": "",
        "instagram": ""
      },
      "ownerId": this.owner2.id
    }
    this.httpService.postPlaces(this.placeObj, headers).subscribe(data => {

    }, error => {
      this.error = error.message;
      console.log(error)
      console.log(error.status)
      this.router.navigate(["/error"])
    })

  }
  // test


}
