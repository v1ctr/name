import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {GRADIENTS} from './gradients';

@Directive({ selector: '[random-gradient]' })
export class RandomGradientDirective implements OnInit{
  constructor(private http: Http, private el: ElementRef) {
  }

  ngOnInit(){
    var random = Math.floor(Math.random() * (GRADIENTS.length + 1));
    var firstColor = GRADIENTS[random].colors[0];
    var secondColor = GRADIENTS[random].colors[1];
    this.el.nativeElement.style.background = {'background-image': 'linear-gradient(to right, '+firstColor+', '+secondColor+')'};
  }
}
