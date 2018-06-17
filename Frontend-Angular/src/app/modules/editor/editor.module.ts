import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { EditorComponent } from './components/editor/editor.component';

// Monaco Editor (VS Code)
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // It is necessary to import as .forRoot() (only in the first module imported)
    MonacoEditorModule.forRoot()
  ],
  declarations: [EditorComponent],
  exports: [EditorComponent]
})
export class EditorModule {}
