import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path:'', component:HomePageComponent},
  {path:'productList', component:ProductListComponent},
  {path:'categoryList', component:CategoryListComponent},
  {path:'addProduct', component:AddProductComponent},
  {path:'addCategory', component:AddCategoryComponent},
  {path:'editProduct/:id', component:AddProductComponent},
  {path:'editCategory/:id', component:AddCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
