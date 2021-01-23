import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { HomeComponent } from 'src/app/components/home';
import { AdminComponent } from 'src/app/components/admin';
import { LoginComponent } from 'src/app/components/login';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsersManagementComponent } from './components/admin/users-management/users-management.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormWizardModule } from 'angular2-wizard';;
import { RecruitComponent } from './components/recruit/recruit.component'


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        routing,
        PdfViewerModule,
        NgbModule.forRoot(),
        SweetAlert2Module.forRoot(),
        NgxPaginationModule,
        Ng2SearchPipeModule,
        FormWizardModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        RegisterComponent,
        UsersManagementComponent,
        UserDetailsComponent,
        RecruitComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
