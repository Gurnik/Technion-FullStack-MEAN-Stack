import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserPost } from '../user-post';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {

  constructor() { }

  @Input()
  user : User = new User();

  @Input()
  post : UserPost = new UserPost();

  ngOnInit(): void {
  }

}
