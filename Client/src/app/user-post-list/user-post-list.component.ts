import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { UtilsService } from 'src/app/models/utils.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserPost } from '../user-post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit {

  constructor(private router: Router, private srv: UtilsService, private http: HttpClient) { }

  @Input()
  user : User = new User();

  addedTitle : string = '';
  addedBody : string = '';

  isAddClicked : boolean = false;
  subAddPost : Subscription = new Subscription();

  onClickAdd() {
      this.isAddClicked = true;
  }

  onClickAddNewPost(isValid: boolean | null) {
    if (isValid == true) {
      this.user.posts?.push(new UserPost(undefined, this.addedTitle, this.addedBody));
      this.subAddPost = this.http
      .put('http://localhost:8000/users/' + this.user._id, this.user)
      .subscribe((status) =>
        alert('New post for User ' + this.user._id + ' has been added!!')
      );      
      this.addedTitle = '';
      this.addedBody = '';
      this.onClickCancel();
    } else {
      alert('Creation of a new post has failed!');
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  onClickCancel() {
    this.isAddClicked = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subAddPost) {
      this.subAddPost.unsubscribe();
    }
  }
}
