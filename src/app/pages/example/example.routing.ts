import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { GridComponent } from './components/grid/grid.component';
import { IconsComponent } from './components/icons/icons.component';
import { ModalsComponent } from './components/modals/modals.component';
import { TypographyComponent } from './components/typography/typography.component';
import { TableComponent } from './components/table/table.component';
import { FormInputsComponent } from './components/forms/inputs';
import { FormLayoutsComponent } from './components/forms/layouts';
import { OtherComponent } from './components/other/other.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,
    children: [
      { path: '', redirectTo: 'buttons' },
      { path: 'buttons', component: ButtonsComponent },
      { path: 'grid', component: GridComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'modals', component: ModalsComponent },
      { path: 'table', component: TableComponent },
      { path: 'forms/inputs', component: FormInputsComponent },
      { path: 'forms/layouts', component: FormLayoutsComponent },
      { path: 'other', component: OtherComponent }
    ]
  }
];

export const RoutingModule = RouterModule.forChild(routes);
