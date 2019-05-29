import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headers;
 
  

  constructor(private http: HttpClient) { }

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

  getConfig(serviceName: string){
    let url: string = "http://localhost:8082/ws-uaa/config-service/show-config/"+serviceName;
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.get(url,{headers:this.headers});
  }

  getConfiguration(serviceName: string){
    let url: string = "http://localhost:8082/ws-uaa/config-service/get-config/"+serviceName;
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.get(url,{headers:this.headers});
  }

  addConfig(config: any, nameService: string){

    config.serviceName = nameService;
    let body = JSON.stringify(config);
    console.log("config to send : "+body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post('/server/config-service/add-config', body, {headers:this.headers});  
  }

  updateConfig(nameService: string, key: string, updatedValue: string){
    
    let body = JSON.stringify({"key":key,"value":updatedValue,"serviceName":nameService});
    console.log("config to send : "+body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post('http://localhost:8082/ws-uaa/config-service/update-config', body, {headers:this.headers});  
  }

  deleteConfig(nameService: string, key: string){
    
    let body = JSON.stringify({"key":key,"value":"","serviceName":nameService});
    console.log("config to send : "+body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post('http://localhost:8082/ws-uaa/config-service/remove-config', body, {headers:this.headers});  
  }

  refreshConfig(){
    let body = JSON.stringify({});
    console.log("trying to refresh");
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
   // this.headers.append('Accept', 'application/json');   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.get('/server/refresh-config', {headers:this.headers}); 
    
  }

}

