import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UtilsService } from 'src/app/models/utils.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserTask } from '../user-task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-task-list',
  templateUrl: './user-task-list.component.html',
  styleUrls: ['./user-task-list.component.css']
})
export class UserTaskListComponent implements OnInit {

  constructor(private router: Router, private srv: UtilsService, private http: HttpClient) { }

  @Input()
  user : User = new User();

  addedTask : string = '';

  isAddClicked : boolean = false;
 
  subAddTask : Subscription = new Subscription();

  onClickAdd() {
      this.isAddClicked = true;
  }

  onClickAddNewTask(isValid: boolean | null) {
    if (isValid == true) {
      this.user.tasks?.push(new UserTask(undefined, this.addedTask, false));
      this.subAddTask = this.http
      .put('http://localhost:8000/users/' + this.user._id, this.user)
      .subscribe((status) =>
        alert('New task: for User ' + this.user._id + ' has been added!!')
      ); 
      this.addedTask = '';
      this.onClickCancel();
    } else {
      alert('Creation of a new task has failed!');
    }
  }

  onClickCancel() {
    this.isAddClicked = false;
    this.srv.refresh();
   //this.reloadComponent(); 
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subAddTask) {
      this.subAddTask.unsubscribe();
    }
  }

}
