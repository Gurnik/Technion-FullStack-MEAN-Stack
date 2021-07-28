import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/models/utils.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  constructor(
    private router: Router,
    private srv: UtilsService,
    private http: HttpClient
  ) {}

  subDelete: Subscription = new Subscription();
  subUpdate: Subscription = new Subscription();

  @Input()
  user: User = new User();

  @Input()
  isAllTasksCompleted : boolean = false;

  @Output()
  notify : EventEmitter<string> = new EventEmitter<string>();

  isOtherDataVisible : boolean = false;

  @Input()
  isIdClicked : boolean = false;

  otherDataOnMouse() {
    this.isOtherDataVisible = true;
  }

  otherDataClick() {
    this.isOtherDataVisible = false;
  }

  onDeleteClick() {
    if (this.user._id != undefined) {
      this.subDelete = this.srv
        .deleteUser('http://localhost:8000/users', this.user._id)
        .subscribe((status) => {
          alert('User ' + this.user._id + ' has been deleted!!');
          this.srv.refresh();
          this.router.navigate(['']);
        });
    }
  }

  onUpdateClick(isValid: boolean | null) {
    if (isValid == true) {
      this.subUpdate = this.http
        .put('http://localhost:8000/users/' + this.user._id, this.user)
        .subscribe((status) =>
          alert('User ' + this.user._id + ' has been updated!!')
        );
       //this.srv.refresh();  
       this.reloadComponent();     
    }
  }

  onIdClick() {  
    this.isIdClicked = true;
    this.notify.emit(this.user._id);
    this.reloadComponent(); 
    this.router.navigateByUrl('/user-activities/' + this.user._id);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  checkTasksStatus(): boolean {
    if(this.user.tasks)
    {
      const filteredTasks = this.user.tasks.filter(element => {
        return element.completed == false 
      });
      if(filteredTasks.length > 0) {
        return false;
      }
      else {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
    if (this.subUpdate) {
      this.subUpdate.unsubscribe();
    }
  }
}
