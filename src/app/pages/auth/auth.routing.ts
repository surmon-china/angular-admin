import { Routes, RouterModule }  from '@angular/router';

import { Auth } from './auth.component';
import { AuthLogin } from './components/login';
import { AuthSecret } from './components/secret';
import { AuthRegister } from './components/register';

const routes: Routes = [
  { path: '',
    component: Auth,
    children: [
      { path: '', redirectTo: 'secret', pathMatch: 'full' },
      { path: 'login', component: AuthLogin },
      { path: 'secret', component: AuthSecret },
      { path: 'register', component: AuthRegister }
    ]
  }
  /*
  { path: '', redirectTo: 'secret', pathMatch: 'full' },
  { path: 'login', component: AuthLogin },
  { path: 'secret', component: AuthSecret },
  { path: 'register', component: AuthRegister } */
];

export const routing = RouterModule.forChild(routes);
