import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatFormFieldModule, 
         MatSelectModule,
         MatButtonModule,
         MatToolbarModule  ,
         MatDialogModule,
         MatInputModule           
        } from '@angular/material';

import { AppComponent } from './app.component';
import { FamilyService } from './family.service';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,    
} from "angular5-social-login";
import { HomeComponent } from './home/home.component';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { AddRelationshipDialogComponent } from './add-relationship-dialog/add-relationship-dialog.component';
import { AddFamilyDialogComponent } from './add-family-dialog/add-family-dialog.component';


const appRoutes: Routes = [  
  {
    path: 'home',
    component: HomeComponent    
  },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },  
];



// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [        
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("652993703927-mnrabqlhm5vbij1h92lg6v8qcepjrr70.apps.googleusercontent.com")
        },
      ]);
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,    
    AddMemberDialogComponent, AddRelationshipDialogComponent, AddFamilyDialogComponent
  ],
  entryComponents: [
    AddMemberDialogComponent,
    AddRelationshipDialogComponent,
    AddFamilyDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,      
    ),

    BrowserAnimationsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatToolbarModule,
    MatDialogModule,
    MatInputModule    
  ],
  providers: [FamilyService, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }, { 
    provide: HTTP_INTERCEPTORS, 
    useClass: MyHttpInterceptor, 
    multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
