import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'})
};

const proxyConfUrl:string = "http://localhost:8082/ws-uaa/config-service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headers;
 
  

  constructor(private http: HttpClient) { }

  getAllUsers(){
    console.log("all users");
  }

  getUserByMail(mail:string){
    console.log("get user by mail : " + mail);

    return new User();
  }

  registerUser(formData){
    console.log("register user : "+ formData);
    this.addUser(formData);
  }

  addUser(user: User) {
    let body = JSON.stringify(user);
    console.log(body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post(`/server/register`, body, {headers:this.headers});  
  }

  updateUser(mail: string, user: User) {
    let body = JSON.stringify(user);
    console.log(body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    console.log("check mail : " + mail );
    return this.http.post('/server/update-user/'+mail, body, {headers:this.headers});  
  }


  removeUser(mail: string) {
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    console.log("check mail : " + mail );
    return this.http.delete('/server/remove-user/'+mail, {headers:this.headers});  
  }

  getConfig(serviceName: string, profile: string){
    let url: string = proxyConfUrl +"/show-config/"+serviceName + "/profile/" + profile;
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.get(url,{headers:this.headers});
  }

  getConfiguration(serviceName: string, profile:string){
    let url: string = proxyConfUrl +"/get-config/" + serviceName + "/profile/" + profile;
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.get(url, {headers:this.headers});
  }

  addConfig(config: any, nameService: string){

    config.serviceName = nameService;
    let body = JSON.stringify(config);
    console.log("config to send : "+body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post(proxyConfUrl +"/add-config", body, {headers:this.headers});  
  }

  updateConfig(nameService: string, key: string, updatedValue: string){
    
    let body = JSON.stringify({"key":key,"value":updatedValue,"serviceName":nameService});
    console.log("config to send : "+body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post(proxyConfUrl +"/update-config", body, {headers:this.headers});  
  }

  deleteConfig(nameService: string, key: string){
    
    let body = JSON.stringify({"key":key,"value":"","serviceName":nameService});
    console.log("config to send : "+body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post(proxyConfUrl +"/remove-config", body, {headers:this.headers});  
  }

  refreshConfig(){
    let body = JSON.stringify({});
    console.log("trying to refresh");
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.get(proxyConfUrl + "/refresh-config", {headers:this.headers}); 
    
  }

}

