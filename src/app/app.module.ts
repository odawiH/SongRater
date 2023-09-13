import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from './cards/card/card.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { BarChartModule } from './bar-chart/bar-chart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    HttpClientModule,
    FlexModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    BarChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
