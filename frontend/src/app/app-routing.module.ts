import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductsStatusComponent } from './update-products-status/update-products-status.component';

// const routes: Routes = [];
const routes: Routes = [
  { path: 'add', 
  component: CreateProductComponent},
  { path: 'update', 
  component: UpdateProductsStatusComponent },
  {
    path: '',
    redirectTo: '/add',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
