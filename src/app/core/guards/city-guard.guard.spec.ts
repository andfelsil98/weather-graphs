import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cityGuardGuard } from './city-guard.guard';

describe('cityGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cityGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
