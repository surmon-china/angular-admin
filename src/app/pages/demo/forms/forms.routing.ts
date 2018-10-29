import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { InputsComponent } from './components/inputs/inputs.component';
import { LayoutsComponent } from './components/layouts/layouts.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      { path: 'inputs', component: InputsComponent },
      { path: 'layouts', component: LayoutsComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
