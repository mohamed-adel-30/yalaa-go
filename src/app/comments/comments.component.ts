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

  comments;
  CommentsOfSpesificPlace = [];
  showedComments = [];
  singlePlaceId;
  placeLoggedin;
  // .......
  rates;
  SpesificRate;

  constructor(private route: ActivatedRoute, private placeService: PlacesService, private httpService: HttpServiceService, private router: Router) {
    this.route.params.subscribe((param: Params) => {
      this.singlePlaceId = param["id"];



      this.httpService.getComments().subscribe(data => {
        this.comments = data;
        this.gettingCommentsOfSinglePlace(this.singlePlaceId)

      })

    })
    this.placeLoggedin = this.httpService.getData("loggedin");


  }

  ngOnInit() {
  }

  addComment(param) {
    this.placeLoggedin = this.httpService.getData("loggedin");
    if (this.placeLoggedin == true) {
      let user;
      user = this.httpService.getData("user");
      // ........rates..//
      this.httpService.getRates().subscribe(data => {
        this.rates = data;
        console.log(user)
        console.log(param.value)
        for (let rate of this.rates) {
          console.log(rate, rate.placeId, this.singlePlaceId, rate.userId, user.id)
          if (rate.placeId == this.singlePlaceId && rate.userId == user.id) {
            this.SpesificRate = rate.value;

          }
        }
      })
      // .......
      setTimeout(() => {


        let headers = { "Conetent-Type": "application/json" }
        let body = {
          "comment": param.value,
          "placeId": this.singlePlaceId,
          "userId": user.id,
          "userName": user.name,
          "userImg": "",
          "rate": this.SpesificRate,
          "saraaa": 2
        }

        this.httpService.postComments(body, headers).subscribe(data => {
          console.log(data);
          this.showedComments.push(data)
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
  }

}
