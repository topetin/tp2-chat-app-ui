import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { QuickRoomDialogComponent } from './components/quick-room-dialog/quick-room-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { QuickRoomComponent } from './components/quick-room-component/quick-room.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ChatService } from './services/commons/chat.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuickRoomDataStorage } from './services/quickRoomDataStorage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuickRoomDialogComponent,
    QuickRoomComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '',  redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'quickRoom', component: QuickRoomComponent}
    ]),
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [ChatService, QuickRoomDataStorage],
  bootstrap: [AppComponent],
  entryComponents: [QuickRoomDialogComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
