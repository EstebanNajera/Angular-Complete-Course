import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "src/app/components/shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "src/app/components/shopping-list/shopping-list.component";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    SharedModule,
    FormsModule
  ]
})
export class ShoppingListModule {}
