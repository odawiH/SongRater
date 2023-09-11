import { TestBed } from '@angular/core/testing';

import { MusicChartsService } from './music-charts.service';

describe('MusicChartsService', () => {
  let service: MusicChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
