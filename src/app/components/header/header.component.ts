import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import * as fromApp from '../../ngrx/store/app.reducer';
import * as AuthActions from '../../ngrx/actions/auth.actions';
import * as RecipesActions from '../../ngrx/actions/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub: Subscription;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authStatus => authStatus.user)).subscribe(
      (user: User) => {
        this.isAuthenticated = !!user
      }
    );
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipe());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
}
