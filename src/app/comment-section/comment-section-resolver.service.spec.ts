import { TestBed } from '@angular/core/testing';

import { CommentSectionResolverService } from './comment-section-resolver.service';

describe('CommentSectionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentSectionResolverService = TestBed.get(CommentSectionResolverService);
    expect(service).toBeTruthy();
  });
});
