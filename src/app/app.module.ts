import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { HttpClientModule } from '@angular/common/http';
import { ScrollTopModule } from 'primeng/scrolltop';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

import { HomeComponent } from './home/home.component';
import { AdPagerComponent } from './home/ad-pager/ad-pager.component';
import { ProductService } from './home/ad-pager/productservice';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdPagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CardModule,
    ToolbarModule,
    PanelModule,
    DropdownModule,
    ButtonModule,
    DataViewModule,
    HttpClientModule,
    ScrollTopModule,
    InputNumberModule,
    MultiSelectModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
