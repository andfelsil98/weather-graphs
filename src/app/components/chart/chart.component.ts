import { Component, inject, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { WeatherByCity } from 'src/app/core/interfaces/weather-by-city';
import { CityPipe } from 'src/app/core/pipes/city.pipe';
import { DateFormatPipe } from 'src/app/core/pipes/date-format.pipe';
import { ChartType } from 'src/app/core/resources/chart-type';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [CityPipe, DateFormatPipe]
})
export class ChartComponent implements OnInit {
  chart?: Chart;
  datesAndTemperatures: {date: string, temperature: number}[] = [];
  @Input() type: ChartType = 'line';
  @Input() cityCode: string = '';
  @Input() weatherByCity: WeatherByCity | null = null;
  public cityPipe = inject(CityPipe);
  public datePipeFormat = inject(DateFormatPipe);
  ngOnInit(): void {
    if(this.weatherByCity?.properties?.periods?.length){
      console.log(this.weatherByCity?.properties?.periods);
      this.weatherByCity.properties.periods.forEach(period => {
        if (period?.startTime && period?.temperature) this.datesAndTemperatures.push({
          date: this.datePipeFormat.transform(period.startTime),
          temperature: period.temperature
        })
      })
      if (this.datesAndTemperatures.length){
        console.log("datesAndTemperatures: ", this.datesAndTemperatures);

        const data = {
          labels: this.datesAndTemperatures.map(element => element.date),
          datasets:[{
            label: `${this.cityPipe.transform(this.cityCode)} weather chart`,
            data: this.datesAndTemperatures.map(element => element.temperature),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
        this.chart = new Chart("chart", {
          type: this.type,
          data
        })
      }
    }

  }
}
