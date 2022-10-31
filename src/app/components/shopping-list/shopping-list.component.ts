import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Ingredient } from "src/app/models/ingredient.model";
import { ShoppingListService } from "src/app/service/shopping-list.service";
import { Store } from '@ngrx/store';
import * as shoppingListReducer from "src/app/ngrx/reducers/shopping-list.reducer";
import * as ShoppingListActions  from "src/app/ngrx/actions/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<shoppingListReducer.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
