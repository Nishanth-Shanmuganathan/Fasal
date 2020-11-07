import { DataService } from './../../service/data.service';
import { UIService } from './../../service/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading: boolean
  profiles: any[]
  constructor(
    private uiService: UIService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.profiles = []
    this.isLoading = true
    this.dataService.profileSubj.subscribe(res => {
      this.isLoading = false
      this.profiles = res
    })
    this.dataService.fetchProfiles()
  }

  openDialog(): void {
    this.uiService.openProfileDialog()
  }
}
