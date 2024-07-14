import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component';
import { ChartComponent } from './components/chart/chart.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
//Pipes
import { CityPipe } from './core/pipes/city.pipe';
//Http client
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//Providers
import { Endpoints } from './core/resources/endpoints';
import { AppInterceptor } from './core/interceptors/app.interceptor';
import { DateFormatPipe } from './core/pipes/date-format.pipe';

@NgModule({
  declarations: [
    //Components
    AppComponent,
    CityListComponent,
    CityDetailComponent,
    ChartComponent,
    //Pipes
    CityPipe,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  providers: [Endpoints, { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
