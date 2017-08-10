import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {db, model} from 'baqend';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  vacancies: model.Stellenangebot[];

  constructor(private router: Router) {
      // Bewerber können keine Stellenausschreibungen sehen
    if (!db.User.me.iscomp) {
      this.router.navigate(['/swipe']);
    }
  }

    ngOnInit() {
    db.Stellenangebot.find().resultList((result) => {
      this.vacancies = result;
    });
    db.modules.get('permission_test')
      .then((result) => {
        console.log(result);
      });
  }

}
