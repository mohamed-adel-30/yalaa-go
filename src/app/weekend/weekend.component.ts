import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpServiceService } from '../http-service.service';
import { UsersService } from '../users.service';


import * as $ from 'jquery';
import { log } from 'util';


@Component({
  selector: 'app-weekend',
  templateUrl: './weekend.component.html',
  styleUrls: ['./weekend.component.scss']
})
export class WeekendComponent implements OnInit {

  //submitForm
  holidayForm: FormGroup;
  userObj;
  user = [];
  weekEnd = {}
  plans;
  locations;
  placeLocation: any = [];
  returnedPlans = [];
  filteredPlans;

  // planForm
  planForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private http: HttpServiceService, private service: UsersService) { }

  ngOnInit() {

    //submitForm
    this.holidayForm = this.formBuilder.group({
      // time: ['', Validators.required],
      // endTime: ['', Validators.required],

      date: ['', Validators.required],
      email: ['', [Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]],

    })

    //////
    this.http.gettingPlaces().subscribe(data => {
      this.plans = data;
      for (let singlePlace of this.plans) {
        this.placeLocation.push(singlePlace.location)
      }

      let filteredPlaces = new Set(this.placeLocation);
      this.locations = [...filteredPlaces];
    })

    //////
    this.userObj = this.http.getData("user")
    console.log(this.userObj);

    this.user.push(this.userObj)

    $('#notSend').click(function () {
      $('.email').css("display", "block")
    })
    $('#send').click(function () {
      $('.email').css("display", "none")
    })


    this.planForm = this.formBuilder.group({
      location: ['', Validators.required],
      haveChild: ['', Validators.required],
      time: [''],
      endTime: ['']
    })

    $('.btn').click(function () {
      $(".makeYourPlan").css("display", "block")
    })


  }




  onOk(form) {



    this.returnedPlans = [];

    for (let plan of this.plans) {
      if (plan.location == form.value.location && plan["kid-friendly"] == form.value.haveChild) {
        this.returnedPlans.push(plan);
      }
    }
    // console.log(this.plans);

    this.filteredPlans = this.returnedPlans.map(() => this.returnedPlans.splice(0, 3)).filter(returnedPlans => returnedPlans)
    console.log(this.filteredPlans);

    for (let index = 0; index < this.filteredPlans.length; index++) {
      this.filteredPlans[index].prop = index;

    }

  }




  book(location) {

    this.weekEnd = {
      "userId": this.userObj.id,
      "email": this.userObj.email,
      "location": location.id
    }


    this.service.addWeekend(this.weekEnd);
  }

}
