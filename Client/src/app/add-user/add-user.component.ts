import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/models/utils.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private srv: UtilsService,
    private router: Router,
    private http: HttpClient
  ) {}

  user: any = { name: '', email: '' };
  sub: Subscription = new Subscription();

  add(isValid: boolean | null) {
    if (isValid == true) {
      this.sub = this.http
        .post('http://localhost:8000/users', this.user)
        .subscribe((data) =>
          alert(
            'New user has been created with the following details:\nName : ' +
              this.user.name +
              '\nEmail : ' +
              this.user.email
          )
        );
        this.srv.refresh();
    } else {
      alert('Adding new user has failed');
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
