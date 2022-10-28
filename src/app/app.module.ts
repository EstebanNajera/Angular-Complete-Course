import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesModule } from './modules/recipes/recipes.module';
import { ShoppingListModule } from './modules/shopping-list/shopping-list.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core.module';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
  // entryComponents: [AlertComponent] no se requiere por la version
})
export class AppModule { }
