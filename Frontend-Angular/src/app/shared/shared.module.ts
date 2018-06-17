import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpWrapperService } from './services/http-wrapper.service';
import { SessionService } from './services/session.service';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

// PrimeNG
import {ScheduleModule} from 'primeng/schedule';
import {OverlayPanelModule} from 'primeng/overlaypanel';

// QR Module
import { NgxQRCodeModule } from 'ngx-qrcode2';


import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCardModule,
    ScheduleModule,
    NgxQRCodeModule,
    OverlayPanelModule
  ],
  declarations: [],
  providers: [HttpWrapperService, SessionService, HttpClient],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCardModule,
    ScheduleModule,
    RouterModule,
    FormsModule,
    NgxQRCodeModule,
    OverlayPanelModule
  ]
})
export class SharedModule {}
