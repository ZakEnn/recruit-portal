import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { config } from 'rxjs/internal/config';
import { AuthenticationService } from 'src/app/_services';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';


const httpOptions = {
   headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({ providedIn: 'root' })
export class UserService {
    token;
    headers;
    constructor(private http: HttpClient) { 
                   
                }

    getAll() {
       // return this.http.get(`/server/api/v1/users`);
       console.log("i got token : "+localStorage.getItem('token'));
       this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
       
       this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));

       console.log("here is my headers : "+ this.headers);
       return this.http.get(`/server/users`,{headers:this.headers});
 
    }

    getByMail(mail: string) {
        // return this.http.get(`/server/api/v1/users`);
        console.log("i got token : "+localStorage.getItem('token'));
        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
        
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
 
        console.log("here is my headers : "+ this.headers);
        return this.http.get('/server/user/' + mail, {headers:this.headers});
  
     }

    getById(id: number) {
        return this.http.get<User>(`${config}/users/${id}`);
    }

    removeUser(mail: string){
        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
       
       this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));

       console.log("here is my headers : "+ this.headers);
       return this.http.get('/server/remove-user/'+mail,{headers:this.headers});
    }

    register(user: User) {
        let body = JSON.stringify(user);
        console.log(body);
      
       // return this.http.post(`/server/api/v1/users/register`, body, httpOptions);   
       return this.http.post(`/server/register`, body, httpOptions);  
       
    }

    sendData(body:any){
        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
        return this.http.post(`/server/sign`, body, {headers:this.headers});  
    }

    getTasks(){

        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
        return this.http.get(`/server/get-tasks/`, {headers:this.headers});  
    }

    getTasksByMail(mail : string){

        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
        return this.http.get('/server/get-tasks/'+mail, {headers:this.headers});  
    }


    getTask(processId,taskKey){
    
        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
        return this.http.get('/server/get-task-description/'+processId+'/'+taskKey, { headers:this.headers });  
    }

    

    signingProcess(body:any, processId){
    
        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
        return this.http.post('/server/signing-process/'+processId, body ,{ headers:this.headers });  
    }

    /////////////////////////////////////////////////:

    getBlockchainTransactions(){
        let url: string = "http://localhost:8082/ws-uaa/blockchain-service/get-all-transactions/";
        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
        return this.http.get(url,{headers:this.headers});

    }
    
    sendDataToBlockchain(body:any){
        this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
        this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
        return this.http.post('/server/send-to-blockchain-service/', body, {headers:this.headers});  
    }
    
}

