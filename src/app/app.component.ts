import { Component } from '@angular/core';
import { LoadStyleService } from './service/load-style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Complete-Course';

  constructor(
    private loadStyleService: LoadStyleService
  ) {
    this.loadStyleService.loadStyle('style.css');
  }
}
