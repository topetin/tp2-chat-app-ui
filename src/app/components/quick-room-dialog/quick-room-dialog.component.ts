import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  room: string;
}

@Component({
  selector: 'app-quick-room-dialog',
  templateUrl: './quick-room-dialog.component.html',
  styleUrls: ['./quick-room-dialog.component.css']
})
export class QuickRoomDialogComponent implements OnInit {

  room: string;
  nickname: string;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<QuickRoomDialogComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      room: ['', Validators.required],
      nickname: ['', Validators.required]
    })
  }

  createQuickRoom() {
    this.dialogRef.close({room: this.form.value.room, user: this.form.value.nickname});
  }

}
