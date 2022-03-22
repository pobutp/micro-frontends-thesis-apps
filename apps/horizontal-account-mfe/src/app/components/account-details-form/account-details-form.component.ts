import { Component, Input } from '@angular/core';

@Component({
  selector: 'ha-mfe-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.scss'],
})
export class AccountDetailsFormComponent {
  @Input() userData: { [key: string]: string } | null = null;
}
