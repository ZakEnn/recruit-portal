import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './_guards';
import { Role } from './_models';
import { HomeComponent } from 'src/app/components/home';
import { LoginComponent } from 'src/app/components/login';
import { AdminComponent } from 'src/app/components/admin';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { UserComponent } from 'src/app/components/user/user.component';

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
        path: 'manage',
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,

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

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);