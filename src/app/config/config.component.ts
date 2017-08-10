import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  user: model.User;

  error;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.user = db.User.me;
  }

  save() {
    this.user.update();
  }
  uploadFiles(files) {
    const pendingUploads = [];
    console.log(files);

    for (let i = 0, numFiles = files.length; i < numFiles; i++) {
      const file = new db.File({data: files[i]});
      pendingUploads.push(file.upload());
    }

    Promise.all(pendingUploads).then(() => {
    });
  }
}
