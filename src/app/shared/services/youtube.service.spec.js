"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var youtube_service_1 = require("./shared/services/youtube.service");
describe('YoutubeService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(youtube_service_1.YoutubeService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=youtube.service.spec.js.map