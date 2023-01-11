import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavpanelComponent } from './components/navpanel/navpanel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular material
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, NavpanelComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
