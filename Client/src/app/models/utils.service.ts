import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient) {}

  getAllUsers(url: string) {
    return this.http.get<User[]>(url);
  }

  getUser(url: string, id: string) {
    return this.http.get<User>(url + '/' + id);
  }

  addUser(url: string, obj: User) {
    return this.http.post(url, obj);
  }

  updateUser(url: string, id: string, obj: User) {
    return this.http.put(url + '/' + id, obj);
  }

  deleteUser(url: string, id: string) {
    return this.http.delete(url + '/' + id);
  }

  refresh(): void {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
