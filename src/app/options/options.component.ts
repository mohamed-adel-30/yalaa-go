import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { PlacesService } from "../places.service"
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OptionsComponent implements OnInit {
  @Input() i: any;
  error = null;
  count = 0;
  totalOfOneGame = 0;
  total;
  operation;
  fixBug = false;

  constructor(private service: PlacesService) {
    this.service.counter = 0;
    this.service.arrOfGames = [];
  }

  ngOnInit() {
  }

  removingOption(price, i) {
    if (this.count != 0) {
      this.count--;
      this.operation = false;
      this.fixBug = true;
      this.addingToCart(this.operation, price, i)

    }
  }


  addingOption(price, i) {
    if (this.count < 10) {
      this.count++;
      this.operation = true;
      this.addingToCart(this.operation, price, i)

    }
  }

  //which will be sendto the option component 

  addingToCart(operation, price, i) {
    this.totalOfOneGame = price * this.count;
    let p: number = price * 1;
    this.service.goT0Service(operation, p, i, this.count);
  }


}