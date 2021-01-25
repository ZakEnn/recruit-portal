import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './_guards';
import { Role } from './_models';
import { HomeComponent } from 'src/app/components/home';
import { LoginComponent } from 'src/app/components/login';
import { AdminComponent } from 'src/app/components/admin';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { UsersManagementComponent } from 'src/app/components/admin/users-management/users-management.component';
import { UserDetailsComponent } from 'src/app/components/admin/user-details/user-details.component';
import { RecruitComponent } from './components/recruit/recruit.component';
import { PasswordComponent } from './components/password/password.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'recruiter',
        component: RecruitComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children:[
            {path: '', component: UsersManagementComponent},
            { path: 'manage-users', component: UsersManagementComponent},
            { path: 'user-details', component: UserDetailsComponent, children:[
                { path: '**', component: UserDetailsComponent}
            ]},

          ],
        canActivate: [AuthGuard],
       // data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent,
                
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'password',
        component: PasswordComponent,
                
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home', canActivate: [AuthGuard],
}
];

export const routing = RouterModule.forRoot(appRoutes);