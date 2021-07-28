import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/models/utils.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import { UserTask } from 'src/app/user-task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css'],
})
export class UserTaskComponent implements OnInit {
  constructor(private router: Router, private srv: UtilsService, private http: HttpClient) {}

  @Input()
  user: User = new User();
  
  @Input()
  task: UserTask = new UserTask();

  @Input()
  isTaskCompleted : boolean = false;

  subTaskCompleted : Subscription = new Subscription();

  onClickTaskComplete() {
    if(this.task)
    {
      this.task.completed = true;
      this.subTaskCompleted = this.http
      .put('http://localhost:8000/users/' + this.user._id, this.user)
      .subscribe((status) =>
        this.isTaskCompleted = true
      ); 
      this.srv.refresh();
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.subTaskCompleted) {
      this.subTaskCompleted.unsubscribe();
    }
  }
}
