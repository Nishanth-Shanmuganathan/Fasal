import { NotificationComponent } from './../components/notification/notification.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalComponent } from '../components/profile-modal/profile-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(
    private dialog: MatDialog
  ) { }

  openProfileDialog() {
    this.dialog.open(ProfileModalComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: '90vw',
      maxWidth: '1000px',
      height: '90vh',
    })
  }

  openNotification(data: string) {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '250px',
      position: {
        top: '0px',
        right: '0px'
      },
      hasBackdrop: false,
      data
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  closeModel() {
    this.dialog.closeAll()
  }
}
