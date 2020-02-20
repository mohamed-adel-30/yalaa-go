import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;
  myForm: FormGroup;
  users;
  errorcheck = false;
  loggedinheader = false;

  constructor(private userservice: UsersService, private fb: FormBuilder, private serviceServer: HttpServiceService, private router: Router) {
    this.userservice.gettingUsers().subscribe((data) => {
      this.users = data;
    })
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    this.email = this.myForm.controls.email.value;
    this.password = this.myForm.controls.password.value;
    for (let i of this.users) {
      if (i.email == this.email && i.password == this.password) {
        this.errorcheck = false;
        this.serviceServer.setData("user", i)
        this.serviceServer.setData("loggedin", true)
        this.loggedinheader = true
        this.serviceServer.displayProfileIcon(this.loggedinheader)
        this.router.navigate(["/"]);
        return i;
      }
    }
    this.errorcheck = true;
  }
}


