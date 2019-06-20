import { Component, OnInit } from '@angular/core';
import { QuickRoomDialogComponent } from '../quick-room-dialog/quick-room-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { QuickRoomService } from 'src/app/services/quick-room.service';
import { ChatService } from 'src/app/services/commons/chat.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { QuickRoomDataStorage } from '../quick-room-dialog/quickRoomDataStorage';
import { PublicRoom } from 'src/app/models/PublicRoom';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private quickroomservice: QuickRoomService,
    private quickRoomDataStorage: QuickRoomDataStorage,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openQuickRoomDialog() {
    const dialogRef = this.dialog.open(QuickRoomDialogComponent, {
      data: {
        room: ''
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.quickroomservice.createQuickRoom(data.room, data.user).subscribe(
        response => {
        this.quickRoomDataStorage.quickRoomData = {room: response.room, users: response.users, latestUser: data.user, token: response.token}
        this.router.navigate(['/quickRoom']);
      },
      error => {
        this._snackBar.open(error, 'OK', {duration: 2000})
      })
    });
  }

  openLogInDialog() {
    this.dialog.open(QuickRoomDialogComponent);
  }

}
