import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Subscription, switchMap } from "rxjs";
import { Recipe } from "src/app/models/recipe.model";
import * as fromApp from '../../../ngrx/store/app.reducer';
import * as RecipesActions from '../../../ngrx/actions/recipe.actions';
import * as ShoppingListActions from '../../../ngrx/actions/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  paramsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.paramsSub = this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }), map(recipeState => {
      return recipeState.recipes.find((recipe, index) => {
        return index === this.id;
      });
    })).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
