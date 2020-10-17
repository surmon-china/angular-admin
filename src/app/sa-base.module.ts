/**
 * @file 全局公共模块
 * @desc app/sa.module
 * @author Surmon <https://github.com/surmon-china>
 */

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// ngx-bootstrap modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import * as Pipes from './pipes';
import * as Services from './services';
import * as Directives from './directives';
import * as Validators from './validators';
import * as Components from './components';

const SA_COMPONENTS = [
  Components.SaCardComponent,
  Components.SaSidebarComponent,
  Components.SaBackTopComponent,
  Components.SaCheckboxComponent,
  Components.SaContentHeaderComponent,
  Components.SaMenuItemComponent,
  Components.SaMenuComponent,
  Components.SaPageHeaderComponent,
  Components.SaPictureUploaderComponent,
  Components.SaMarkdownEditorComponent,
  Components.SaLoadingSpiderComponent
];

const SA_DIRECTIVES = [
  Directives.SaScrollPositionDirective,
];

const SA_PIPES = [
  Pipes.AppPicturePipe,
  Pipes.DataToLocalePipe,
  Pipes.TruncatePipe
];


const SA_SERVICES = [
  Services.SaHttpLoadingService,
  Services.SaHttpRequesterService,
  Services.SaImageLoaderService,
  Services.SaBootingSpinnerService,
  Services.SaTokenService,
  Services.SaRenewalService
];

const SA_VALIDATORS = [
  Validators.EmailValidator,
  Validators.EqualPasswordsValidator
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    ...SA_PIPES,
    ...SA_DIRECTIVES,
    ...SA_COMPONENTS
  ],
  exports: [
    ...SA_PIPES,
    ...SA_DIRECTIVES,
    ...SA_COMPONENTS
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SaBaseModule {
  static forRoot(): ModuleWithProviders<SaBaseModule> {
    return {
      ngModule: SaBaseModule,
      providers: [
        ...SA_VALIDATORS,
        ...SA_SERVICES
      ]
    };
  }
}
