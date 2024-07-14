import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cityGuard: CanActivateFn = (route, state) => {
  const validCities = ['LWX', 'TOP'];//Only District of Columbia Forecast and Kansas Forecast
  const city = route.paramMap.get('city');
  const router = inject(Router);
  if (city && validCities.includes(city)) {
    return true;
  } else {
    router.navigate(['/city-list']);
    return false;
  }
};
