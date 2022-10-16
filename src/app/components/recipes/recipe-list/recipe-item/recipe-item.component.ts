import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Recipe } from "src/app/models/recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() selectedRecipe: EventEmitter<void> =  new EventEmitter<void>();

  constructor() {}

  loadData() {
    this.selectedRecipe.emit();
  }
}
