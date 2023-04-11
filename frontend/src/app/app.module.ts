import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgxSpinnerModule } from "ngx-spinner"; 

import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductsStatusComponent } from './update-products-status/update-products-status.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    UpdateProductsStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
