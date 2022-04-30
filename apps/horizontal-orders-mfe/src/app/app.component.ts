import { connectRouter } from '@angular-architects/module-federation-tools';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'micro-frontends-thesis-apps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Not needed anymore when using the bootstrap helper with
    // appType == 'microfrontend'
    connectRouter(this.router);
  }
}
