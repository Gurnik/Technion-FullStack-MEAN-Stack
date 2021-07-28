import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UserCardComponent } from './user-card/user-card.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserActivitiesComponent } from './user-activities/user-activities.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserTaskListComponent } from './user-task-list/user-task-list.component';
import { UserPostListComponent } from './user-post-list/user-post-list.component';

const appRoutes: Routes = [ 
  { path: 'user-activities/:id', component: UserActivitiesComponent},
  { path: 'add-user', component: AddUserComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    UserCardComponent,
    AddUserComponent,
    UserActivitiesComponent,
    UserTaskComponent,
    UserPostComponent,
    UserTaskListComponent,
    UserPostListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
