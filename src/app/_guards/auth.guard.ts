import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       let currentUserStatus = this.authenticationService.isAuthenticated();
       console.log("current user status : "+currentUserStatus +"///"+this.authenticationService.verifyTokenValidity());

       if(currentUserStatus){
            return true;
       }
        else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }   
       
      //  
   
    }

       
    
    
}