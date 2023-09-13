import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarChartComponent } from './bar-chart.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [BarChartComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [BarChartComponent],
  providers: [],
  bootstrap: [],
})
export class BarChartModule {}
