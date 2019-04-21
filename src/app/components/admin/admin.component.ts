import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { UserService } from 'src/app/_services';


@Component({ 
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    users :any = [];

    constructor(private userService: UserService) { 
    }

    ngOnInit() {
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.users = users;
        this.userService.getAll().subscribe(users => {
            this.users = users;
        });
    }

}