import { TestBed } from '@angular/core/testing';

import { HorariosServicesService } from './horarios-services.service';

describe('HorariosServicesService', () => {
  let service: HorariosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
