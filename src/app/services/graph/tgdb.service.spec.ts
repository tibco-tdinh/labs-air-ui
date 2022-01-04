import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { TgdbService } from './tgdb.service';

describe('TgdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterModule.forRoot([])
    ]
  }));

  it('should be created', () => {
    const service: TgdbService = TestBed.inject(TgdbService);
    expect(service).toBeTruthy();
  });
});
