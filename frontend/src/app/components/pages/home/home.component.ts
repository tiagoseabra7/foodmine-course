import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    let FoodsObservalbe:Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        FoodsObservalbe = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      else if (params['tag'])
        FoodsObservalbe = this.foodService.getAllFoodsByTag(params['tag']);
      else
        FoodsObservalbe = this.foodService.getAll();

        FoodsObservalbe.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
    });
  }

  ngOnInit(): void {}
}
