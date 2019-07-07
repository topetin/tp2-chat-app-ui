import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ShareDialogData {
  url: string;
}

@Component({
  selector: 'app-quick-room-share',
  templateUrl: './quick-room-share.component.html',
  styleUrls: ['./quick-room-share.component.scss']
})
export class QuickRoomShareComponent implements OnInit {

  url: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShareDialogData,
    public dialogRef: MatDialogRef<QuickRoomShareComponent>) { }

  ngOnInit() {
    this.url = this.data.url
  }

}
