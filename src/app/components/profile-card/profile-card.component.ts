import { DomSanitizer } from '@angular/platform-browser';
import { UIService } from './../../service/ui.service';
import { Component, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() profile: any
  imageURL

  constructor(
    private renderer: Renderer2,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.fetchImage(this.profile.profilePicture)
  }
  @HostListener('error') mouse(event: Event) {
    this.renderer.addClass(event.target, 'd-none')
  }

  errorImage(event: Event): void {
    const genderImage = this.profile.gender === 'Male' ? 'male.svg' : 'female.svg'
    this.renderer.setAttribute(event.target, 'src', './../../../assets/profile/' + genderImage)
  }

  fetchImage(data) {
    let base64String = btoa(data);
    this.imageURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/ jpg;base64,' + base64String);
  }
}
