import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "src/app/components/auth/auth/auth.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    SharedModule,
    FormsModule
  ]
})
export class AuthModule {}
