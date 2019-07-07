import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/commons/chat.service';
import { QuickRoomDataStorage } from '../../services/quickRoomDataStorage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuickRoomShareComponent } from '../quick-room-share/quick-room-share.component';
import { Message } from 'src/app/models/Message';
import * as moment from 'moment';

const joinMessage = ' has joined the room';
const leftMessage = ' has left the room';
const typingMessage = ' is typing...';

@Component({
  selector: 'app-quick-room',
  templateUrl: './quick-room.component.html',
  styleUrls: ['./quick-room.component.scss']
})
export class QuickRoomComponent implements OnInit {

  message: string;
  messages: string[] = [];
  users: string[] = [];
  notifications: Array<Object> = [];

  latestUser: any; 
  latestUserColor: string;
  room: any;
  isTyping: Boolean = false;
  userTyping: string = '';

  ioOnTyping: any;

  constructor(
    private chatService: ChatService,
    private quickRoomDataStorage: QuickRoomDataStorage,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    if(!this.quickRoomDataStorage.quickRoomData) {
      return this.router.navigate(['']);
    } 
    console.log(this.quickRoomDataStorage.quickRoomData);
      this.latestUser = this.quickRoomDataStorage.quickRoomData.LatestUser;
      this.latestUserColor = this.getLatestUserColor(this.latestUser);
      console.log(this.latestUserColor)
      this.room = this.quickRoomDataStorage.quickRoomData.Server.room;
      this.initIoConnection();
  }

  private initIoConnection(): void {
    this.chatService.initSocket();

    this.chatService.join(this.room, this.latestUser);
    
    this.chatService.onMessage().subscribe((message: any) => {
        this.messages.push(message);
    });

    this.chatService.onJoin().subscribe((data: any) => {
      let date = moment().calendar();
      this.notifications.push({date: date, user: data.user, message: joinMessage});
      this.users.push(data.user)
    })

    this.chatService.onDisconnect().subscribe((data: any) => {
      let date = moment().calendar();
      this.notifications.push({date: date, user: data, message: leftMessage});
      this.users.splice(this.users.indexOf(data), 1)
    })

    this.chatService.onPreviousMessages().subscribe((messages: any) => {
      this.messages = messages.messages
    })

    this.ioOnTyping = this.chatService.onTyping().subscribe((user: any) => {
      if (user === false) {
        this.isTyping = false;
      } else {
        this.isTyping = true;
        this.userTyping = user + typingMessage;
      }
    })
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    let date = moment().calendar(); 
    let messageObject = new Message(message, this.latestUser, this.latestUserColor, date);
    this.chatService.send(this.room, messageObject);
    this.message = null;
    this.chatService.notifyTyping(this.room, false);
  }

  public shareRoom () {
    this.dialog.open(QuickRoomShareComponent, {
      data: {
      url: `localhost:4200/quickRoom/${this.quickRoomDataStorage.quickRoomData.Server.token}`
      }
    })
  }

  public onTyping() {
    this.chatService.notifyTyping(this.room, this.latestUser);
  }

  public onNotTyping() {
    if (this.message === '') {
      this.chatService.notifyTyping(this.room, false);
    }
  }

  private getLatestUserColor(user) {
    const index = this.quickRoomDataStorage.quickRoomData.Server.users.findIndex((u) => u.userName === user)
    return this.quickRoomDataStorage.quickRoomData.Server.users[index].userColor;
  }

}
