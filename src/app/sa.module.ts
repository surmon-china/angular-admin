/**
 * @file 全局公共模块
 * @module app/sa-module
 * @author Surmon <https://github.com/surmon-china>
 */

import { ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SaThemeConfig } from './theme/theme.config';
import { SaThemeConfigProvider } from './theme/theme.configProvider';
import { SaCardBlurDirective } from './components/saCard/saCardBlur.directive';

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
  Components.SaContentTopComponent,
  Components.SaMenuItemComponent,
  Components.SaMenuComponent,
  Components.SaPageTopComponent,
  Components.SaMsgCenterComponent,
  Components.SaMultiCheckboxComponent,
  Components.SaPictureUploaderComponent,
  Components.SaMarkdownEditorComponent,
  Components.SaLoadingSpiderComponent
];

const SA_DIRECTIVES = [
  SaCardBlurDirective,
  Directives.SaScrollPositionDirective,
  Directives.SaThemeRunDirective
];

const SA_PIPES = [
  Pipes.SaAppPicturePipe,
  Pipes.SaProfilePicturePipe,
  Pipes.DataToLocalePipe,
  Pipes.TruncatePipe
];

const SA_SERVICES = [
  Services.SaHttpRequesterService,
  Services.SaImageLoaderService,
  Services.SaThemeSpinnerService,
  Services.SaThemePreloaderService,
];

const SA_VALIDATORS = [
  Validators.EmailValidator,
  Validators.EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...SA_PIPES,
    ...SA_DIRECTIVES,
    ...SA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...SA_PIPES,
    ...SA_DIRECTIVES,
    ...SA_COMPONENTS
  ]
})
export class SaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: SaModule,
      providers: [
        SaThemeConfigProvider,
        SaThemeConfig,
        ...SA_VALIDATORS,
        ...SA_SERVICES
      ]
    };
  }
}
