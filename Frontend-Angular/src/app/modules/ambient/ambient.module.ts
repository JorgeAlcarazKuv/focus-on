import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundListComponent } from './components/sound-list/sound-list.component';
import { SharedModule } from '../../shared/shared.module';
import { LandingSelectorComponent } from './components/landing-selector/landing-selector.component';
import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SoundListComponent, LandingSelectorComponent, QrDialogComponent],
  entryComponents: [QrDialogComponent],

  exports: [SoundListComponent]
})
export class AmbientModule {}
