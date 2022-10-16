import { Component } from '@angular/core';
import { LoadStyleService } from './service/load-style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';

  constructor(
    private loadStyleService: LoadStyleService
  ) {
    this.loadStyleService.loadStyle('style.css');
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
