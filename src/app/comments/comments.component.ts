import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { HttpServiceService } from '../http-service.service'
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  error = null;

  limit = 4;
  comments;
  // Writecomments = false
  CommentsOfSpesificPlace = [];
  showedComments = [];
  showedCommentsReversed = [];

  singlePlaceId;
  placeLoggedin;
  // for star rates
  arrRates = [1, 2, 3, 4, 5];
  arrsecRates = [1, 2, 3, 4];
  arrthirdRates = [1, 2, 3];
  arrfourthRates = [1, 2];
  arrfifthRates = [1];

  // .......
  rates;
  SpesificRate;
  SpesificRateArr;
  user;
  inputDisplay = [];

  dropDown = false;
  pageOfItems = [];

  showMore() {
    this.limit = 20;
  };
  showLess() {
    this.limit = 4;
  };

  constructor(private route: ActivatedRoute, private placeService: PlacesService, private httpService: HttpServiceService, private router: Router) {
    this.route.params.subscribe((param: Params) => {
      this.singlePlaceId = param["id"];



      this.httpService.getComments().subscribe(data => {
        this.comments = data;
        this.CommentsOfSpesificPlace = [];
        this.showedComments = [];
        this.showedCommentsReversed = []
        this.gettingCommentsOfSinglePlace(this.singlePlaceId)
        for (let i of this.comments) {
          this.inputDisplay.push(false)


        }



      }, error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)
        this.router.navigate(["/error"])
      })

    })
    this.user = this.httpService.getData("user");
    this.placeLoggedin = this.httpService.getData("loggedin");


  }



  ngOnInit() {

  }


  dropDownDelOrEdit() {
    this.dropDown = !this.dropDown
  }
  addComment(param) {

    // this.Writecomments = true
    this.placeLoggedin = this.httpService.getData("loggedin");
    if (this.placeLoggedin == true) {
      let user;
      user = this.httpService.getData("user");
      // ........rates..//
      this.httpService.getRates().subscribe(data => {
        this.rates = data;

        for (let rate of this.rates) {

          if (rate.placeId == this.singlePlaceId && rate.userId == user.id) {
            this.SpesificRate = rate.value;
            this.SpesificRateArr = rate.arrOfVals;


          }
        }

      }, error => {
        this.error = error.message;
        console.log(error)
        console.log(error.status)
        this.router.navigate(["/error"])
      })

      setTimeout(() => {
        let headers = { "Conetent-Type": "application/json" }
        let body = {
          "comment": param.value,
          "placeId": this.singlePlaceId,
          "userId": user.id,
          "userName": user.name,
          "userImg": "",
          "rate": this.SpesificRate,
          "arrOfRate": this.SpesificRateArr
        }

        this.httpService.postComments(body, headers).subscribe(data => {

          this.showedComments.push(data);
          this.showedCommentsReversed = [...this.showedComments]
          this.showedCommentsReversed.reverse();
        })
        param.value = "";
      }, 1000)

    }
    else {
      alert("you have to register")
      this.router.navigate(['/register'])
    }

  }

  gettingCommentsOfSinglePlace(id) {
    for (let comment of this.comments) {
      if (comment.placeId == id) {
        this.CommentsOfSpesificPlace.push(comment);
      }
    }
    this.showedComments = [...this.CommentsOfSpesificPlace]
    this.showedCommentsReversed = [...this.showedComments]
    this.showedCommentsReversed.reverse();
  }
  // delete comment btn hadling
  deleteComm(id) {
    this.httpService.deleteComments(id).subscribe(
      (data) => {

        let index;
        index = this.findingIndex(id);

        this.showedComments.splice(index, 1);

        this.showedCommentsReversed = [...this.showedComments]
        this.showedCommentsReversed.reverse();


      }

    )
  }

  //function to know the index of specific Comment
  findingIndex(id) {
    for (let i = 0; i < this.showedComments.length; i++) {
      if (this.showedComments[i].id == id) {
        return i;
      }
    }
  }

  editComm(id, i) {
    this.inputDisplay[i] = true
    setTimeout(() => {
      let input;
      input = Array.from(document.getElementsByClassName(id))
      input[0].setAttribute("style", "display:block;");
    }, 10)

  }

  addingEdidtedComment(id, i) {

    // ........rates..//
    this.httpService.getRates().subscribe(data => {
      this.rates = data;

      for (let rate of this.rates) {

        if (rate.placeId == this.singlePlaceId && rate.userId == user.id) {
          this.SpesificRate = rate.value;
          this.SpesificRateArr = rate.arrOfVals;

        }
      }

    })
    // .....///

    let index;
    index = this.findingIndex(id);
    let user;
    user = this.httpService.getData("user");
    let input;
    setTimeout(() => {
      input = document.getElementById(id);


      let headers = { "Conetent-Type": "application/json" }
      let body = {
        "comment": input.value,
        "placeId": this.singlePlaceId,
        "userId": user.id,
        "userName": user.name,
        "userImg": "",
        "rate": this.SpesificRate,
        "arrOfRate": this.SpesificRateArr
      }

      this.httpService.editComment(id, body, headers).subscribe(
        (data) => {


          this.inputDisplay[i] = false;
          let obj;
          this.httpService.getSingleComments(id).subscribe(data => {
            obj = data;

            this.showedComments.splice(index, 1, obj);
            this.showedCommentsReversed = [...this.showedComments]
            this.showedCommentsReversed.reverse();
          })

        }
      )

    }, 10)

  }

}
