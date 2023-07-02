import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";
import { AppComponent } from "../app.component";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthenticationService, AuthenticationServiceConfig } from "./authentication.service";
import { PreviousRouteService } from "./previous-route.service";
import { AuthGuardService } from "./auth-guard.service";
import { ErrorInterceptor } from "./error-interceptor";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    PreviousRouteService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule){
    if (parentModule) {
      throw new Error(
        'AuthModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: AuthenticationServiceConfig) {
    return {
      ngModule: AuthModule,
      providers: [
        {provide: AuthenticationServiceConfig, useValue: config }
      ]
    };
  }
}
