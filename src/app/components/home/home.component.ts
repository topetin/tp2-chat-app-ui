import { Component, OnInit } from '@angular/core';
import { QuickRoomDialogComponent } from '../quick-room-dialog/quick-room-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { QuickRoomService } from 'src/app/services/quick-room.service';
import { ChatService } from 'src/app/services/commons/chat.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { QuickRoomDataStorage } from '../../services/quickRoomDataStorage';

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
      if (data.action === 'create') {
        return this.quickroomservice.createQuickRoom(data.room, data.user).subscribe(
          response => {
          this.quickRoomDataStorage.quickRoomData = {'Server': response, 'LatestUser': data.user};
          this.router.navigate(['/quickRoom']);
        },
        error => {
          this._snackBar.open(error, 'OK', {duration: 2000})
        })
      }
      if (data.action === 'join') {
        return this.quickroomservice.joinQuickRoom(data.room, data.user).subscribe(
          response => {
            this.quickRoomDataStorage.quickRoomData = {'Server': response, 'LatestUser': data.user};
            this.router.navigate(['/quickRoom']);
          },
          error => {
            console.log(error);
            this._snackBar.open(error, 'OK', {duration: 2000})
          })
      }

    });
  }

  openLogInDialog() {
    this.dialog.open(QuickRoomDialogComponent);
  }

}
