import { Subject } from 'rxjs';
import { UIService } from './ui.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  profileSubj = new Subject<any[]>()
  private profiles: any[]
  constructor(
    private http: HttpClient,
    private uiService: UIService
  ) { }

  uploadProfileDetails(profileCred: { username: string, age: number, gender: string, profilePicture: File }) {
    const data = new FormData();
    data.append('username', profileCred.username);
    data.append('age', profileCred.age.toString());
    data.append('gender', profileCred.gender);
    data.append('profilePicture', profileCred.profilePicture);
    return this.http.post<{ message, profile }>(environment.server + 'node-profile/', data)
      .subscribe(res => {
        this.profiles.push(res.profile)
        this.profileSubj.next(this.profiles)
        this.uiService.closeModel()
        this.uiService.openNotification(res?.message)
      }, err => {
        this.uiService.openNotification(err.error.message || null)
      })
  }

  fetchProfiles() {
    return this.http.get<{ profiles: [] }>(environment.server + 'node-profile/')
      .subscribe(res => {
        this.profiles = res.profiles
        this.profileSubj.next(this.profiles)
      },
        err => {
          this.uiService.openNotification(err.error.message || null)
        })
  }
}
