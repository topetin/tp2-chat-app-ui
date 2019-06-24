import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuickRoomService } from 'src/app/services/quick-room.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuickRoomDataStorage } from 'src/app/services/quickRoomDataStorage';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface QuickRoomEnterDialogData {
  room: string;
}

@Component({
  selector: 'app-quick-room-enter',
  templateUrl: './quick-room-enter.component.html',
  styleUrls: ['./quick-room-enter.component.css']
})
export class QuickRoomEnterComponent implements OnInit {

  token: string;
  roomData: any;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private quickroomservice: QuickRoomService,
    public dialog: MatDialog,
    private quickRoomDataStorage: QuickRoomDataStorage,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')
    this.quickroomservice.getRoomByToken(this.token).subscribe(
      data => {
        this.roomData = data;
        this.openDialog()
      }, 
      error => {
        this.error = error;
      })
    }

    openDialog() {
      const dialogRef = this.dialog.open(QuickRoomEnterDialog, {
        data: {
          room: this.roomData.room
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        return this.quickroomservice.joinQuickRoom(data.room, data.user).subscribe(
          response => {
            this.quickRoomDataStorage.quickRoomData = {'Server': response, 'LatestUser': data.user};
            this.router.navigate(['/quickRoom']);
          },
          error => {
            console.log(error);
            this._snackBar.open(error, 'OK', {duration: 2000})
          })
      })
    }
}

@Component({
  selector: 'app-quick-room-enter-dialog',
  templateUrl: './quick-room-enter-dialog.html',
})
export class QuickRoomEnterDialog implements OnInit{

  nickname: string;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<QuickRoomEnterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QuickRoomEnterDialogData,
    private fb: FormBuilder) {}
  
  ngOnInit() {
    this.form = this.fb.group({
      nickname: ['', Validators.required]
    })
  }

  joinQuickRoom(): void {
    this.dialogRef.close({room: this.data.room, user: this.form.value.nickname});
  }

}
