import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './views/home/header/header.component';
import { PrjectsComponent } from './views/home/prjects/prjects.component';

import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DashboardComponent } from './views/home/dashboard/dashboard.component';
import { SignupComponent } from './views/signup/signup.component';
import { DialogModule } from '@angular/cdk/dialog';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { GraphQLModule } from './graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    PrjectsComponent,
    DashboardComponent,
    SignupComponent,
    CreateProjectComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    
    HttpClientModule,
    MatCardModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
    DragDropModule,
    DialogModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
