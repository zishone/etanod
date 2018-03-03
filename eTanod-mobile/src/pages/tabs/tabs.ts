import { Component } from '@angular/core';

import { ReportsPage } from '../reports/reports';
import { ProfilePage } from '../profile/profile';
import { CheckPage } from '../check/check';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ReportsPage;
  tab2Root = CheckPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
