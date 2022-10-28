import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesModule } from './modules/recipes/recipes.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './ngrx/reducers/shopping-list.reducer';

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
    CoreModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  bootstrap: [AppComponent]
  // entryComponents: [AlertComponent] no se requiere por la version
})
export class AppModule { }
