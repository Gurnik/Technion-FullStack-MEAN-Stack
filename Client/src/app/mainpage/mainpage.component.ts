import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/models/utils.service';
import { User } from 'src/app/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  constructor(private router: Router, private srv: UtilsService) {}

  sub: Subscription = new Subscription();
  users: any[] = [];
  filteredUsers: User[] = [];
  isSearched: boolean = false;
  userIdWhenClicked : string | undefined = '';

  onUserIdWhenClicked(userCardId : string) {
    this.userIdWhenClicked = userCardId;
  }

  userCardColorHandler(userCardIterationId : string | undefined) : boolean {
    if(this.userIdWhenClicked === userCardIterationId) {
      return true;
    }
    return false;
  }

  onSerach(str: string): void {
    this.filteredUsers = [];

    if (str.length >= 1) {
      this.isSearched = true;
      this.users.forEach((searchForUser) => {
        if (
          searchForUser.name
            .toLocaleLowerCase()
            .includes(str.toLocaleLowerCase()) == true
        ) {
          this.filteredUsers.push(searchForUser);
        } else if (
          searchForUser.email
            .toLocaleLowerCase()
            .includes(str.toLocaleLowerCase()) == true
        ) {
          this.filteredUsers.push(searchForUser);
        }
      });
      this.router.navigate(['']);
    } else {
      this.isSearched = false;
    }
    return;
  }

  ngOnInit(): void {
    this.sub = this.srv
      .getAllUsers('http://localhost:8000/users')
      .subscribe((data) => (this.users = data));

    this.filteredUsers = this.users;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
