import { Component, inject, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataLabel } from 'src/app/core/interfaces/data-label';
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
  dataLabels: DataLabel[] = [];
  @Input() type: ChartType = 'line';
  @Input() cityCode: string = '';
  @Input() weatherByCity: WeatherByCity | null = null;
  public cityPipe = inject(CityPipe);
  public datePipeFormat = inject(DateFormatPipe);
  ngOnInit(): void {
    if(this.weatherByCity?.properties?.periods?.length){
      this.weatherByCity.properties.periods.forEach(period => {
        if (period?.startTime && period?.temperature) this.dataLabels.push({
          date: this.datePipeFormat.transform(period.startTime),
          temperature: period.temperature,
          shortForecast: period.shortForecast,
          windSpeed: period.windSpeed,
        })
      })
      if (this.dataLabels.length){
        const data = {
          labels: this.dataLabels.map(element => element.date),
          datasets:[{
            label: `${this.cityPipe.transform(this.cityCode)} weather chart`,
            data: this.dataLabels.map(element => element.temperature),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
        let thisClass = this;
        const options = {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°F)'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  let label = context.dataset.label || '';
                  if (label) label += '. ';
                  if (context.parsed.y !== null) label += `Temperature: ${context.parsed.y} °F`;
                  const date = context.label;
                  const additionalData: any = thisClass.dataLabels.find((info: any) => info.date === date);
                  if (additionalData) label += ` (Short Forecast: ${additionalData.shortForecast}, Wind speed: ${additionalData.windSpeed})`;
                  return label;
                }.bind(this)
              }
            }
          }
        };


        this.chart = new Chart("chart", {
          type: this.type,
          data,
          options: options
        })
      }
    }

  }
}
