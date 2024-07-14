import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city'
})
export class CityPipe implements PipeTransform {

  transform(cityCode: string): string {
    switch(cityCode){
      case 'LWX':
        return 'District of Columbia Forecast';
      case 'TOP':
        return 'Kansas Forecast';
      default:
        return cityCode;
    }
  }

}
