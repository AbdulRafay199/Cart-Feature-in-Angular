import { TestBed } from '@angular/core/testing';

import { ManageCartService } from './manage-cart.service';

describe('ManageCartService', () => {
  let service: ManageCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
