import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { db } from 'baqend';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {



  constructor(private router: Router) {

  }
}
