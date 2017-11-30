import { Response } from '@angular/http';
import { RoomsService } from './getRoomsService';
import { ConfirmComponent } from './modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  search= '';
  mySearch1 = '';
  isAdmin: boolean;
  xPos;
  gebE0= false;
  gebE1= false;
  gebE2= false;
  gebE3= true;
  gebU1= false;
  gebU2= false;
  title = 'IBM Kelsterbach rooms plan';
  constructor(private dialogService: DialogService, private admin: RoomsService ) {}
  ngOnInit() {
     this.admin.isAdmin().subscribe(
         (response: Response) => {           
             const temp = response.json();
             if(temp.admin == 'true') this.isAdmin = true;
             else this.isAdmin = false; },
         (error) => this.isAdmin = false
     )
  }

    showConfirm(ev) {
        if (this.isAdmin === false) return;
      const x = ev.clientX;
      this.xPos = x;
          console.log("X" + this.xPos);
          const y = ev.clientY;
          console.log('Y' + y);
          const cursor = document.getElementById('cursor');
          //cursor.style.visibility = 'visible';
          // tslint:disable-next-line:radix
          const w = parseInt(cursor.style.width) ;
          console.log('wcursor:' + w);
          var build;

          if (this.gebE0)  build = document.getElementById('building0');
          if (this.gebE1)  build = document.getElementById('building1');
          if (this.gebE2)  build = document.getElementById('building2');
          if (this.gebE3)  build = document.getElementById('building3');
          if (this.gebU1)  build = document.getElementById('buildingU1');
          if (this.gebU2)  build = document.getElementById('buildingU2');
         // const build = document.getElementById('building');
          var rect = build.getBoundingClientRect();
          console.log('top:' + rect.top, 'right:' + rect.right, 'bottom:' + rect.bottom, 'left:' + rect.left);

       //   var bodyRect = document.body.getBoundingClientRect();

     //     console.log('btop:' + bodyRect.top, 'bright:' + bodyRect.right, 'bbottom:' + bodyRect.bottom, 'bleft:' + bodyRect.left);
          // tslint:disable-next-line:whitespace
        //  alert('x - '+ (x - rect.left-12)*100/(rect.right - rect.left)+ 'y - '+ (y - rect.top-5)*100/(rect.bottom -rect.top));

          var posx = Math.round((x - rect.left - 12) * 100 / (rect.right - rect.left)) + "%";
          let posy =  Math.round((y - rect.top - 15) * 100 / (rect.bottom - rect.top)) + "%";

      let disposable = this.dialogService.addDialog(ConfirmComponent, {
          title: 'Enter values',
          message: 'Confirm message',
          xPos: posx,
          yPos: posy},
        ).subscribe((isConfirmed) => {
              // We get dialog result
              if (isConfirmed) {
                  alert('Document was saved');
              }
              else {
          //        alert('Canceled');
              }
          });
      //We can close dialog calling disposable.unsubscribe();
      // If dialog was not closed manually close it by timeout

//      setTimeout(()=>{
 //         disposable.unsubscribe();
 //     },10000);
}
onRoomChanged(room: string){
    this.gebE0 = false;
    this.gebE1 = false;
    this.gebE2 = false;
    this.gebE3 = false;
    this.gebU1 = false;
    this.gebU2 = false;
    if (room.includes('51_E1'))this.gebE1 = true;
    if (room.includes('51_E2'))this.gebE2 = true;
    if (room.includes('51_E3'))this.gebE3 = true;
    if (room.includes('51_E0')) this.gebE0 = true;
    if (room.includes('51_U1'))this.gebU1 = true;
    if (room.includes('51_U2'))this.gebU2 = true;


}
}
