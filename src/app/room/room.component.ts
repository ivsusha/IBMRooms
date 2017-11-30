import { Response } from '@angular/http';
import { RoomsService } from './../getRoomsService';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() mySearch: string ;
  @Output() onRoomChanged = new EventEmitter<string>();
  mySearch1= undefined; 
  roomArray: {geb: string, descr: string}[]=[];
  constructor(private rooms: RoomsService ) {

   }

  ngOnInit() {
    this.rooms.getRooms().subscribe(
      (response: Response) => {
        this.roomArray = response.json();
      //  this.roomArray: {geb: string, descr: string}[] = response.json();
       // this.viewEntryArray = this.getView(viewArray);

   },
    (error) => console.log(error)
  );
  }
 onClick(entry) {
   this.mySearch1 = entry.geb;  
   this.onRoomChanged.emit(entry.geb);
  const item = document.getElementById('cursor');
  const badge = item.getElementsByClassName('badge'); 
 // const build = document.getElementById('building');
  item.style.visibility = 'visible';
 
  item.style.left = entry.x ;
  item.style.top = entry.y;
  badge[0].innerHTML = entry.descr;
//  console.log('top:'+rect.top, 'right:'+rect.right, 'bottom:'+ rect.bottom, 'left:'+ rect.left);
 // this.mySearch1 = undefined;  
  var pos = item.getBoundingClientRect();
  if(pos.top>window.innerHeight)  window.scrollTo(pos.left, pos.top);
 
 }
}
