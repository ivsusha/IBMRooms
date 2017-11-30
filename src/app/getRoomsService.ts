import { getTestBed } from '@angular/core/testing';
import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

 @Injectable()
export class RoomsService {

   constructor(private http: Http) {}
   // tslint:disable-next-line:one-line
   getRooms() {
    const headers = new Headers([{'Content-Type': 'application/json'}, {'Access-Control-Allow-Origin': '*'},
    {'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'},
  {'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'}]);
  //  const header = new Headers({'Content-Type': 'application/json'});
   // return (this.http.get('assets/rooms.json', { headers: headers }));
   return (this.http.get('rooms_plan.nsf/rooms.xsp?view=all', { headers: headers }));
   }
   
   setRoom(roomArray:{geb: string, descr: string, x: string, y: string }){
     const body = JSON.stringify(roomArray);
 //    const body = "{geb:" + "'"+roomArray.geb + "'"+ ', descr:' + "'"+roomArray.descr + "'"+
 //    ", x:" + "'"+roomArray.x + "%'" +", y:" + "'"+roomArray.y + "%'}"
     let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    return (this.http.post('rooms_plan.nsf/rooms.xsp?view=save', body, { headers: headers }));
   }
   isAdmin() {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
       return(this.http.get('rooms_plan.nsf/rooms.xsp?view=isadmin', { headers: headers }));
     }
   
}
