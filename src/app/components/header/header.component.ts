import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/service/auth.service";
import { DataStorageService } from "src/app/service/data-storage.service";

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
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
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
