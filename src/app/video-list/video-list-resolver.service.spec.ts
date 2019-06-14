import { TestBed } from '@angular/core/testing';

import { VideoListResolverService } from './video-list-resolver.service';

describe('VideoListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoListResolverService = TestBed.get(VideoListResolverService);
    expect(service).toBeTruthy();
  });
});
