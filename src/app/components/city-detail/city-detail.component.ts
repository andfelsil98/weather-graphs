import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherByCity } from 'src/app/core/interfaces/weather-by-city';
import { GraphsService } from 'src/app/services/graphs.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {
  cityCode: string = '';
  weatherByCity: WeatherByCity | null = null;
  public route = inject(ActivatedRoute);
  public graphService = inject(GraphsService);
  private toastr = inject(ToastrService);
  ngOnInit(): void {
    this.cityCode = this.route.snapshot.paramMap.get('city') ?? '';
    this.getWeatherByCity();
  }

  getWeatherByCity(){
    const weatherObserver = {
      next: (data: WeatherByCity) => {
        if (data) this.weatherByCity = data;
        else this.weatherByCity = null;
      },
      error: () => {
        this.toastr.error('An error occurred with the request !', 'Error');
      }
    };
    this.graphService.getWeatherInfoByCity(this.cityCode).subscribe(weatherObserver);
  }
}
