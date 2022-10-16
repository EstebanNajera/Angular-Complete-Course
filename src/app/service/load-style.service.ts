import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadStyleService {
  constructor() {}

  loadStyle(styleName: string) {
    const head = window.document.getElementsByTagName('head')[0];

    let themeLink = window.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = window.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
    }
  }
}
