import { UsersService } from '../users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  checker: boolean = true;
  userData;
  myForm: FormGroup;
  loggedinheader = false;


  constructor(private formBuilder: FormBuilder, private service: UsersService, private router: Router, private httpService: HttpServiceService) { }


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

    })
    console.log(this.userData);
  }

  check(form: FormGroup) {
    // debugger
    for (let index = 0; index < this.userData.length; index++) {
      if (form.value.email === this.userData[index].email) {
        console.log(this.userData[index].email);
        this.checker = false;
        break;
      }
      else {
        this.checker = true;
      }
    }

    return this.checker;
  }
  obj;
  onSubmit(form) {

    if (this.check(form)) {
      this.obj = {
        "name": form.value.name,
        "email": form.value.email,
        "password": form.value.password,
        "image": "",
        "rate": 1,
        "favourites": [],
        "history": [],
        "visa": 0
      }
      // console.log(this.obj)
      this.service.addUsers(this.obj)
      this.router.navigate(["/"])
      localStorage.clear();
      this.httpService.setData("user", this.obj)
      this.httpService.setData("loggedin", true);
      this.loggedinheader = true;
      this.httpService.displayProfileIcon(this.loggedinheader)
    }
    else {
      alert('found');
    }
  }

}
