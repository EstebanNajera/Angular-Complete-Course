import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/service/auth.service";
import { DataStorageService } from "src/app/service/data-storage.service";
import * as fromApp from '../../ngrx/store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
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
    this.authService.logout();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
