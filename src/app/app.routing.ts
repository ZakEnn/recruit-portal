import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './_guards';
import { Role } from './_models';
import { HomeComponent } from 'src/app/components/home';
import { LoginComponent } from 'src/app/components/login';
import { AdminComponent } from 'src/app/components/admin';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { UsersManagementComponent } from 'src/app/components/admin/users-management/users-management.component';
import { ConfigurationComponent } from 'src/app/components/admin/configuration/configuration.component';
import { ArchivingComponent } from 'src/app/components/admin/archiving/archiving.component';
import { AuditComponent } from 'src/app/components/admin/audit/audit.component';
import { UserDetailsComponent } from 'src/app/components/admin/user-details/user-details.component';

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
        children:[
            {path: '', component: ConfigurationComponent},
            { path: 'configuration', component: ConfigurationComponent},
            { path: 'manage-users', component: UsersManagementComponent},
            { path: 'archivage', component: ArchivingComponent},
            { path: 'audit-service', component: AuditComponent},
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

    // otherwise redirect to home
    { path: '**', redirectTo: 'home', canActivate: [AuthGuard],
}
];

export const routing = RouterModule.forRoot(appRoutes);