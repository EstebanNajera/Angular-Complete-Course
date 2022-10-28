import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "src/app/components/shared/alert/alert.component";
import { LoadingSpinnerComponent } from "src/app/components/shared/loading-spinner/loading-spinner.component";
import { DropdownDirective } from "src/app/Utils/directives/dropdown.directive";
import { PlaceholderDirective } from "src/app/Utils/directives/placeholder.directive";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {}
