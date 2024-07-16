import { Component, inject } from '@angular/core';
import { CityCard } from 'src/app/core/interfaces/city-card';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  cities: Array<CityCard> = [{
    cityCode: 'LWX',
    src: 'https://i.ibb.co/cC1vy6G/Columbia-city.jpg'
  },{
    cityCode: 'TOP',
    src: 'https://i.ibb.co/pxcPnf5/Kansas-city.jpg'
  }];
  public router = inject(Router);
  public toastr = inject(ToastrService);
  cityDetail(cityCode: string){
    if(cityCode) this.router.navigateByUrl(`/weather/${cityCode}`);
    else this.toastr.error('An error occurred with the request !', 'Error');
  }
}
