import { DataService } from './../../service/data.service';
import { UIService } from './../../service/ui.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  username: string;
  isMale: boolean;
  age: number;
  profilePicture: File
  imageSrc: string | ArrayBuffer
  profileChanged: boolean

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private uiService: UIService,
    private dataService: DataService,
  ) {
    iconRegistry.addSvgIcon(
      'male',
      sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/icons/male.svg'));
    iconRegistry.addSvgIcon(
      'female',
      sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/icons/female.svg'));
  }

  ngOnInit(): void {
    this.isMale = true
    this.profileChanged = false


  }

  addUser() {
    const err = this.validityCheck()
    if (err) {
      return this.uiService.openNotification(err)
    }
    const user = {
      username: this.username,
      age: this.age,
      gender: this.isMale ? 'Male' : 'Female',
      profilePicture: this.profilePicture
    }
    this.dataService.uploadProfileDetails(user)

  }
  onImagePicked(event: Event) {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const validationPattern = new RegExp((/\.(png|jpg|jpeg)$/i))
      if (!validationPattern.test((file.name))) {
        return this.uiService.openNotification('Invalid image type...')
      } else
        if (file.size > 100000) {
          return this.uiService.openNotification('Image size too large. Maximum file size should be 100KB...')
        }
      this.profilePicture = file
      this.profileChanged = true
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.profilePicture);
    }
  }

  validityCheck() {
    if (!this.username) {
      return 'Username is required...'
    }
    if (!this.age) {
      return 'Age is required...'
    }
    if (!this.profilePicture) {
      return 'Profile picture is required...'
    }
    return null
  }
}
