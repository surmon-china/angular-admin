import { Routes, RouterModule } from '@angular/router';

import { UiComponent } from './ui.component';
import { Buttons } from './components/buttons/buttons.component';
import { Grid } from './components/grid/grid.component';
import { Icons } from './components/icons/icons.component';
import { Modals } from './components/modals/modals.component';
import { Typography } from './components/typography/typography.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UiComponent,
    children: [
      { path: 'buttons', component: Buttons },
      { path: 'grid', component: Grid },
      { path: 'icons', component: Icons },
      { path: 'typography', component: Typography },
      { path: 'modals', component: Modals }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
