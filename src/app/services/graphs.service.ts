import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Endpoints } from '../core/resources/endpoints';
import { WeatherByCity } from '../core/interfaces/weather-by-city';
@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  public http = inject(HttpClient);
  public endpoints = inject(Endpoints);

  getWeatherInfoByCity(cityCode: string){
    return this.http.get<WeatherByCity>(`${environment.urlWeatherServer}${cityCode}${this.endpoints.getWeatherByCity}`)
  }
}
