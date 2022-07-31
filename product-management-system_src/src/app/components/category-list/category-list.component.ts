import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:Category[];

  constructor(
    private categoryService:CategoryService,
    private route:Router,
    private activedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(() => {
    this.getAllCategories();
  });
}

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  updateCategory(id:number){
    this.route.navigateByUrl("/editCategory/" + id)
  }

  deleteCategory(id:number){
    if(confirm("Are you sure you want to delete this item?")){
      this.categoryService.deleteCategory(id).subscribe(data => {console.log('deleted')
      this.getAllCategories();
    });
    }
  }
}
