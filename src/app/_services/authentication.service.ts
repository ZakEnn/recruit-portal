import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { config } from 'rxjs/internal/config';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decode } from 'punycode';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
};

 
const helper = new JwtHelperService();
 

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public dataLogin;
    jwt:string;
    email:string;
    roles:Array<string>;

    constructor(private http: HttpClient,
                private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(this.dataLogin);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(email: string, password: string) {
        return this.http.post('http://localhost:8082/ws-uaa/login', { email, password }, {observe: 'response',  responseType: 'text'});
    }

    saveToken(jwt: string){
        localStorage.setItem('token',jwt);
        this.jwt = jwt;
        this.parseJWT();
    }

    parseJWT(){
       // this.saveToken(this.jwt);
        let jwtHelper = new JwtHelperService();
        let objJWT = jwtHelper.decodeToken(this.jwt);
        console.log("JWTOBJECT  / "+objJWT);
        console.log("jwt expiration status : "+ jwtHelper.isTokenExpired(this.jwt))
        this.email = objJWT.obj;
        this.roles = objJWT.roles;
    }

    verifyTokenValidity(){
        let jwtHelper = new JwtHelperService();
            if(this.jwt){
                return jwtHelper.isTokenExpired(this.jwt);
            }
            return false;
        
    }

    isAdmin(){
        let jwtHelper = new JwtHelperService();
        this.roles =  jwtHelper.decodeToken(localStorage.getItem('token')).roles;
        return this.roles.indexOf('ADMIN') >=0;
    }

    isUser(){
        let jwtHelper = new JwtHelperService();
        this.roles = jwtHelper.decodeToken(localStorage.getItem('token')).roles;
        return this.roles.indexOf('USER') >=0;
    }

    isAuthenticated(){
        let tokenExist =  localStorage.getItem('token')?true:false;
        let tokenExpire = this.verifyTokenValidity();
       // console.log("status auth : "+ (tokenExist && !tokenExpire));
        return (tokenExist && !tokenExpire);
    }

    loadToken(){
        this.jwt = localStorage.getItem('authorization');
        this.parseJWT();
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.initParams();
      //  localStorage.removeItem('role');
    }

    initParams(){
        this.jwt=undefined;
        this.email=undefined;
        this.roles=undefined;
    }
}