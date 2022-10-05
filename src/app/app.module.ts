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
import { GalleriaModule } from 'primeng/galleria';
import { SkeletonModule } from 'primeng/skeleton';

import { HomeComponent } from './home/home.component';
import { AdPagerComponent } from './home/ad-pager/ad-pager.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'detail/:id', pathMatch: 'full', component: ItemDetailComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdPagerComponent,
    ItemDetailComponent,
    SafeHtmlPipe
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
    MultiSelectModule,
    GalleriaModule,
    SkeletonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
