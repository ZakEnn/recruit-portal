import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'})
};

const proxyUrl:string = "http://localhost:8082/ws-uaa/";

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  private headers;
  constructor(private http: HttpClient) { }

  sendNotification(data:any){
    console.log("data to send : " + JSON.stringify(data));
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post(proxyUrl +"send-notification", data, {headers:this.headers});  
  }



}
