import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{
   
  
    currentUser: User;
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
       // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
       
    }

    ngOnInit(): void {
        window.addEventListener("beforeunload", function(e) {
            var confirmationMessage = "\o/";
          console.log("cond");
            e.returnValue = confirmationMessage; 
            return confirmationMessage;  
          });
        // this.authenticationService.loadToken();
       
        
    }
    
    isAdmin(){
        return this.authenticationService.isAdmin();
    }

    isUser(){
        return this.authenticationService.isUser();
    }

    isAuthenticated(){
        return this.authenticationService.isAuthenticated();
    }

    logout() {
        this.authenticationService.logout();
        this.isAuthenticated();
        this.router.navigate(['/login']);
    }

}