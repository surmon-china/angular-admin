import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }     from '../../theme/nga.module';
import { routing }       from './auth.routing';

import { AuthService }   from './auth.service';
import { Auth }          from './auth.component';
import { AuthLogin }     from './components/login';
import { AuthSecret }    from './components/secret';
import { AuthRegister }  from './components/register';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  providers: [
    AuthService
  ],
  declarations: [
    Auth,
    AuthLogin,
    AuthSecret,
    AuthRegister
  ]
})
export default class AuthModule {
}
