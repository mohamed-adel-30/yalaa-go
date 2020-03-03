import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './../http-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery"
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  error = null;
  myForm: FormGroup;
  toggle = false;
  toggle2 = false;
  newObj;

  user;
  allHistory;
  userHistory = [];
  usersData;
  userData;
  checker;


  allFavourites;
  userFavouritesIds = [];
  userFavouritesPlaces = [];
  fileData: File = null;
  imagee: any;
  imageSrc: any = "https://i.postimg.cc/76tHbf1v/person-icon.png";

  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    this.preview();
  }
  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.imageSrc = reader.result;


      this.user.image = reader.result;

      this.service.setData("user", this.user);

      let headers = { "Content-Type": "application/json" };

      this.service.updateUserData(this.user.id, this.user, headers).subscribe(data => {

      }, error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)
        this.router.navigate(["/error"])
      });
    };

  }
  constructor(private service: HttpServiceService, private router: Router) {
    this.service.getFav().subscribe(data => {
      this.allFavourites = data;
      for (let fav of this.allFavourites) {
        if (fav.userId == this.user.id) {
          this.userFavouritesIds.push(fav.placeId);
        }
      }
      for (let i of this.userFavouritesIds) {
        this.service.getSinglePlace(i).subscribe(data => {
          this.userFavouritesPlaces.push(data);
        })
      }

      this.service.getHistroy().subscribe(data => {
        this.allHistory = data;
        for (let i of this.allHistory) {
          if (this.user.id == i.userId) {
            this.userHistory.push(i.reservedGame);
          }
        }
      })
    });
  }
  removeFav(event) {
    let id = parseInt(event.srcElement.parentNode.id);
    for (let fav of this.allFavourites) {
      if (fav.userId == this.user.id && fav.placeId == id) {
        this.service.deleteFav(fav.id).subscribe(data => {

        });
        event.srcElement.parentNode.style.opacity = ".5";
        event.target.style.color = "grey";
      }
    }
  }
  ngOnInit() {

    this.user = this.service.getData("user");
    this.service.getSingleUser(this.user.id).subscribe(data => {
      this.userData = data;
    })

    this.service.gettingUsers().subscribe(data => {
      this.usersData = data;
    })

    this.service.getHistroy().subscribe(data => {
      this.allHistory = data;
    })

    this.myForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]),
    });

    // ===============pagination========//

  }

  checkMail(mail) {
    for (let index = 0; index < this.usersData.length; index++) {
      if (mail == this.usersData[index].email) {
        this.checker = false;
        break;
      }
      else {
        this.checker = true;
      }
    }

    return this.checker;
  }

  showEditForm() {
    this.toggle = !this.toggle
  }
  showHistory() {
    this.toggle2 = !this.toggle2
  }


  checkPass(pass, name, mail) {
    if (this.checkMail(mail.value) == false && this.user.email != mail.value) {
      alert('mail found');
      return;
    }

    if (pass.value == this.userData.password && this.user.email == mail.value) {

      this.newObj = {
        "name": name.value,
        "email": mail.value,
        "password": this.userData.password,
        "image": this.user.image,
        "visa": this.user.visa,
        "id": this.user.id
      }


      let headers = { "Content-Type": "application/json" };
      this.service.updateUserData(this.user.id, this.newObj, headers).subscribe(data => {
      }, error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)
        this.router.navigate(["/error"])
      });

      this.service.setData("user", this.newObj);
      this.user = this.service.getData("user");

    }
    else {
      alert('wrong password');

    }
  }

}