import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { QuickRoomDialogComponent } from './components/quick-room-dialog/quick-room-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { QuickRoomComponent } from './components/quick-room/quick-room.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ChatService } from './services/commons/chat.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuickRoomDataStorage } from './services/quickRoomDataStorage';
import { QuickRoomShareComponent } from './components/quick-room-share/quick-room-share.component';
import { QuickRoomEnterComponent, QuickRoomEnterDialog } from './components/quick-room-enter/quick-room-enter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuickRoomDialogComponent,
    QuickRoomComponent,
    QuickRoomShareComponent,
    QuickRoomEnterComponent,
    QuickRoomEnterDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '',  redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'quickRoom', component: QuickRoomComponent},
      {path: 'quickRoom/:token', component: QuickRoomEnterComponent, pathMatch: 'full'}
    ]),
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [ChatService, QuickRoomDataStorage],
  bootstrap: [AppComponent],
  entryComponents: [QuickRoomDialogComponent, QuickRoomShareComponent, QuickRoomEnterDialog]
})
export class AppModule { }
