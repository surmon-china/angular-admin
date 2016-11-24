import { Routes, RouterModule }  from '@angular/router';

// import { Auth } from './components/auth.component';
import { Login } from './components/login';
import { Secret } from './components/secret';
import { Register } from './components/register';

const routes: Routes = [
  /*
  {
    path: '',
    component: Auth,
    children: [
      { path: '', redirectTo: 'secret', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'secret', component: Secret },
      { path: 'register', component: Register }
    ]
  }
  */
  { path: '', redirectTo: 'secret', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'secret', component: Secret },
  { path: 'register', component: Register }
];

export const routing = RouterModule.forChild(routes);
