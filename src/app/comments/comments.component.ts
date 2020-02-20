import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { HttpServiceService } from '../http-service.service'
import { timingSafeEqual } from 'crypto';

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
            this.SpesificRateArr=rate.arrOfVals;
            console.log(rate.value)
          
          }
        }
        console.log(this.SpesificRate)
        // for(let i=0; i<this.SpesificRate ;i++){
        //   this.dumyarray.push(i)
          
        // }

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
          "arrOfRate": this.SpesificRateArr
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
  // delete btn
  deleteComm(id){
    this.httpService.deleteComments(id).subscribe(
      (data)=>{console.log('deleeeeeeetee')
      let index;
      index= this.findingIndex(id);
      this.showedComments.splice(index, 1);
    
    }

    )
  }

  //function to know he index od specific Comment
  findingIndex(id)
  {
    for (let i=0;i<this.showedComments.length;i++)
    {
          if (this.showedComments[i].id==id)
          {
            return i;
          }
    }
  }
  // edit btn
  // para = document.getElementById('custome-para');
inputDisplay=false;

  editComm(id){
    this.inputDisplay=true
 
  }

  addingEdidtedComment(id)
  {
    let index;
   index= this.findingIndex(id);
    let user;
    user = this.httpService.getData("user");
    let input;
    setTimeout(()=>{
      input = document.getElementById(id);
      console.log(input.value)
       
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
   
    this.httpService.editComment(id,body,headers).subscribe(
      (data)=>{console.log('editttt')}
    )
    this.inputDisplay=false;
    let obj;

    setTimeout(()=>{
      this.httpService.getSingleComments(id).subscribe(data=>{
        obj=data;
        console.log(obj);
        this.showedComments.splice(index, 1, obj);
      })
    },500)

    },500)
    
   
  }
  // edit btn
}
