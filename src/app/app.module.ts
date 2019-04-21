import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { UserComponent } from './components/user/user.component'
import { HomeComponent } from 'src/app/components/home';
import { AdminComponent } from 'src/app/components/admin';
import { LoginComponent } from 'src/app/components/login';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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

    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,  
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
