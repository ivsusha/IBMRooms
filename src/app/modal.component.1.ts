import { RoomsService } from './getRoomsService';
import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
export interface ConfirmModel {
  title: string;
  message: string;
  xPos: string;
  yPos: string;
  geb: string;
  descr: string;
 // roomArray:  {geb: string, descr: string, x: string, y: string} ;
}
@Component({
    selector: 'confirm',
    template:
    `<div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                 <button type="button" class="close" (click)="close()" >&times;</button>
                 <h4 class="modal-title">Enter values</h4>
               </div>
               <div class="modal-body">
                 <div class="container">
                 <div class="row">
                   <div class="col-xs-12 col-md-4">
                 
                   <div class="form-group">
                   <label for="build">Gebäude </label>
                     <input type="text" name="build" id="build" class="form-control" value=""
                     [(ngModel)] = build required="required" 
                     value="51" pattern="" title="">                     
                   </div>
                   <div class="form-group">
                   <label for="etage">Etage </label>
                     <input type="text" name="etage" id="etage" class="form-control" value=""
                     [(ngModel)] = etage required="required" 
                     value="" pattern="" title="">                     
                   </div>
                   <div class="form-group">
                   <label for="fl">Flügel </label>
                     <input type="text" name="fl" id="fl" class="form-control" value=""
                     [(ngModel)] = fl required="required" 
                     value="" pattern="" title="">                     
                   </div>
                   <div class="form-group">
                   <label for="raum">Raum </label>
                     <input type="text" name="raum" id="raum" class="form-control" value=""
                     [(ngModel)] = raum required="required" 
                     value="" pattern="" title="">                     
                   </div>
                     <div class="form-group">
                     <label for="geb">Raum </label>
                       <input type="text" name="geb" id="geb" class="form-control" value=""
                       [(ngModel)] = geb required="required" 
                       value="Geb_51_E0_0.0.000" pattern="Geb_51_E0_0.0.000" title="Geb_51_E0_0.0.000">
                       <span> Example: Geb_51_E0_3.0.039 </span>
                     </div>
                  
                     <div class="form-group">
                     <label for="x">Pos X</label>
                       <input type="text" name="x" id="x" class="form-control" value=""
                       [(ngModel)] = xPos
                          title="">

                     </div>
                     <div class="form-group">
                     <label for="y">Pos Y</label>
                         <input type="text" name="y" id="y" class="form-control" value=""
                           title="" [(ngModel)] = yPos>

                       </div>
                       
                       <div class="form-group">
                       <label for="descr">Beschreibung</label>
                           <input type="text" name="descr" id="descr" class="form-control" value=""
                           [(ngModel)] = descr required="required" pattern="" title="">
                         </div>
                         <span> Example:Geb.51 Etage 0 Flügel 3 Raum 39</span>
                   </div>
                 </div>
               </div>



               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                 <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
               </div>
             </div>
          </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  title: string;
  message: string;
  xPos: string;
  yPos: string;
  geb: string;
  descr: string;
  build: string;
  etage: string;
  fl: string;
  raum: string;
  constructor(dialogService: DialogService, private rooms: RoomsService) {
    super(dialogService);
  }



  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    const roomArray:  {geb: string, descr: string, x: string, y: string }  = {geb: this.geb,
       descr: this.descr, x: this.xPos, y: this.yPos };
      // Geb_51_E1_2.0.013   Geb.51 Etage 1 Flügel 2 Raum 13
       roomArray.geb = "Geb_"+this.build+"_E"+this.etage+"_"+this.fl+"."+
       this.etage+"."+this.raum;
       roomArray.descr = "Geb."+this.build+" Etage "+this.etage+" Flügel "+
       this.fl+" Raum "+ this.raum;
    this.rooms.setRoom(roomArray).subscribe(
      (response: Response) => {
        console.log(response);
      //  this.roomArray: {geb: string, descr: string}[] = response.json();
       // this.viewEntryArray = this.getView(viewArray);

   },
    (error) => {console.log(error); this.result = false; }
  );
    this.result = true;
    this.close();
  }
}
