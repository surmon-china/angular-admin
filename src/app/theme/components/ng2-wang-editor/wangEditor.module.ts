import { NgModule } from '@angular/core';

import { wangEditorComponent } from './wangEditor.component';

/**
 * wangEditorModule
 */
@NgModule({
  declarations: [
    wangEditorComponent,
  ],
  exports: [
    wangEditorComponent,
  ]
})
export class WangEditorModule {}
