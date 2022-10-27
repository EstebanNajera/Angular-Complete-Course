import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { LoadStyleService } from './service/load-style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private loadStyleService: LoadStyleService,
    private authService: AuthService
  ) {
    this.loadStyleService.loadStyle('style.css');
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
