import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ServerService } from './shared/services/server.service';
import { AppComponent } from './app.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';


@NgModule({
  declarations: [AppComponent, ClientFormComponent, ClientListComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
