import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadStyleService } from './service/load-style.service';
import * as fromApp from './ngrx/store/app.reducer';
import * as AuthActions from './ngrx/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private loadStyleService: LoadStyleService,
    private store: Store<fromApp.AppState>
  ) {
    this.loadStyleService.loadStyle('style.css');
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
