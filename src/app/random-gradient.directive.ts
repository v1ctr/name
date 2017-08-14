import { Directive, ElementRef, Input } from '@angular/core';
import {Http} from '@angular/http';

@Directive({ selector: '[random-gradient]' })
export class RandomGradientDirective {

  background = "#FFFFFF";

  gradients: {
    name: string;
    colors: string[];
  }[];

  constructor(private http: Http, private el: ElementRef) {
    this.http.get('assets/gradients.json')
      .subscribe( (res) => {
        this.gradients = res.json();
        console.log(this.gradients.length);
        var random = Math.floor(Math.random() * (this.gradients.length + 1));
        console.log(random);
        var firstColor = this.gradients[random].colors[0];
        var secondColor = this.gradients[random].colors[1];
        console.log(firstColor);
        console.log('linear-gradient(to right, '+firstColor+', '+secondColor+');');
        //this.background = 'linear-gradient(to right, #73c8a9, #373b44);';
        el.nativeElement.style.background = firstColor;
        //el.nativeElement.style.backgroundColor = firstColor;
        //el.nativeElement.style.backgroundImage = 'linear-gradient(to right, '+firstColor+', '+secondColor+');';
        //el.nativeElement.style.background = 'linear-gradient(to right, '+firstColor+', '+secondColor+');';
      });
  }
}
