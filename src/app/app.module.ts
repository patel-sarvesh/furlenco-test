import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { reducers } from './shared/app-store.reducers';
import { HelperService } from './shared/helper.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      // logOnly: Environment.production, // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule,
    PopoverModule,
    ButtonsModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
