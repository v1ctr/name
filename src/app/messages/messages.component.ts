import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { model, db } from 'baqend';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: model.Message[];

  constructor(private router: Router) {}

  ngOnInit() {
    db.Message.find().resultList((result) => {
      this.messages = result;
    });
  }

}
