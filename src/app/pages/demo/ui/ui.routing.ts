import { Routes, RouterModule } from '@angular/router';
import { UiComponent } from './ui.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { GridComponent } from './components/grid/grid.component';
import { IconsComponent } from './components/icons/icons.component';
import { ModalsComponent } from './components/modals/modals.component';
import { TypographyComponent } from './components/typography/typography.component';

const routes: Routes = [
  {
    path: '',
    component: UiComponent,
    children: [
      { path: 'buttons', component: ButtonsComponent },
      { path: 'grid', component: GridComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'modals', component: ModalsComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
