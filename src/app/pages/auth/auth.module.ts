import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgaModule }     from '../../theme/nga.module';

import { routing }       from './auth.routing';
import { Login }         from './components/login';
import { Secret }        from './components/secret';
import { Register }      from './components/register';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Login,
    Secret,
    Register
  ]
})
export default class AuthModule {
}
