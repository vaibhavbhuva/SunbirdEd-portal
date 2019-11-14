import { TestBed } from '@angular/core/testing';

import { Ckeditor4ConfigService } from './ckeditor4-config.service';

describe('Ckeditor4ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ckeditor4ConfigService = TestBed.get(Ckeditor4ConfigService);
    expect(service).toBeTruthy();
  });
});
