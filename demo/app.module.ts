import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { VCLPlotlyModule } from '../src/index';

import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { DEMO_COMPONENTS } from "./demo-components";

import { routing, appRoutingProviders } from './app.routes';

@NgModule({
  providers: [
    appRoutingProviders
  ],
  imports: [
    FormsModule,
    BrowserModule,
    routing,
    VCLPlotlyModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ...(DEMO_COMPONENTS.map(dc => dc.component))
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
}

