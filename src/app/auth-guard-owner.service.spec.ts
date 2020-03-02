import { TestBed } from '@angular/core/testing';

import { AuthGuardOwnerService } from './auth-guard-owner.service';

describe('AuthGuardOwnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardOwnerService = TestBed.get(AuthGuardOwnerService);
    expect(service).toBeTruthy();
  });
});
