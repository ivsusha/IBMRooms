import { ConfirmComponent } from './modal.component';
import { SearchFilter } from './search.filter';
import { RoomsService } from './getRoomsService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RoomComponent } from './room/room.component';
import { EnterComponent } from './enter/enter.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    SearchFilter,
    EnterComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule
  ],
  providers: [
    RoomsService
  ],
  entryComponents: [
    ConfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
