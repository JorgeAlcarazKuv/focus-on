import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarComponent } from './components/bar/bar.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BarComponent, LoginDialogComponent, RegisterDialogComponent],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent],
  exports: [BarComponent]
})
export class NavbarModule {}
