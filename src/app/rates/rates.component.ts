import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { HttpServiceService } from './../http-service.service'

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatesComponent),
      multi: true
    }
  ]
})
export class RatesComponent implements OnInit, ControlValueAccessor {
  @Input() id;
  flag = true;
  places_;
  rateObj = { userId: 1, value: 0 }
  public disabled: boolean;
  public value: number;
  public rating = [
    {
      "stars": 1,
    },
    {
      "stars": 2,
    },
    {
      "stars": 3,
    },
    {
      "stars": 4,
    },
    {
      "stars": 5,
    }
  ]

  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  setRating(star: any) {
    if (!this.disabled) {
      this.value = star.stars;
      this.onChange(star.stars);
      this.onTouch();
    }

    if (this.flag) {
      let headers = { "Content-Type": "application/json" }
      let user;
      user = this.service.getData("user")
      // console.log("hhhhhhhhhhhhhhhh")
      // console.log(user)
      let arr=[];
      for(let i=0;i<this.value;i++)
      {
        arr.push(i)
      }
      let body =
      {
        "value": this.value,
        "placeId": this.id,
        "userId": user.id,
        "arrOfVals":arr
      }
      this.service.postRate(body, headers).subscribe(data => {
        // console.log(data);
      })
    }
    this.flag = false;
  }
  constructor(private service: HttpServiceService) {
  }

  ngOnInit(): void {
  }

}
