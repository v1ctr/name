import {Component, OnInit, EventEmitter, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent implements OnInit {

  cards: any[] = [];
  cardCursor: number = 0;
  orientation: string = "x";
  overlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };

  constructor(private router: Router) {
    for (var i = 0; i < 50; i++) {
      this.cards.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        pitch: "pitch "+(i+1)
      });
    }

  }

  ngOnInit() {

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.like(true);
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.like(false);
    }
  }

  like(like: boolean) {
    var self = this;
    if (this.cards.length > 0) {
      self.cards[this.cardCursor++].likeEvent.emit({ like });
      // DO STUFF WITH YOUR CARD
    }
  }

  onCardLike(event) {
    var item = this.cards[this.cardCursor++];
    // DO STUFF WITH YOUR CARD
  }

  onRelease(event) {


  }

  onAbort(event) {

  }

  onSwipe(event) {

  }

}
