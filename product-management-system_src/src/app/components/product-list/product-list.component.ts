import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];

  constructor(
    private productService:ProductService,
    private route:Router,
    private activedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(() => {
      this.getAllProducts()
    });
    
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  updateProduct(id:number){
    this.route.navigateByUrl("/editProduct/" + id)
  }

  deleteProduct(id:number){
    if(confirm("Are you sure you want to delete this item?")){
      this.productService.deleteProduct(id).subscribe(data => {console.log('deleted')
      this.getAllProducts();
    });
    }
  }
}
