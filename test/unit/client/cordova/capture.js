/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
describe("Cordova 2.0 Capture bridge", function () {
    var camera,
        capture,
        event,
        s,
        e,
        captureSpy,
        _file = ['whimsicaluri', { fullPath: '' } ];

    describe("on captureImage", function () {
        beforeEach(function () {
            spyOn(document, "getElementById").andReturn({
                addEventListener: jasmine.createSpy("addEventListener")
            });

            camera = ripple('ui/plugins/camera');
            capture = ripple('platform/cordova/2.0.0/bridge/capture');
            event = ripple('event');
            s = jasmine.createSpy("success");
            e = jasmine.createSpy("error");
            captureSpy = jasmine.createSpy("captured-image");
            event.once("captured-image", captureSpy);
            spyOn(camera, "show");
        });

        xit("can be called with no args", function () {
            expect(capture.captureImage).not.toThrow();
            expect(camera.show).toHaveBeenCalled();
            expect(function () {
                event.trigger("captured-image", _file, true);
            }).not.toThrow();
            expect(captureSpy).toHaveBeenCalled();
        });

        it("can be called without specifying an error callback", function () {
            capture.captureImage(s);
            expect(camera.show).toHaveBeenCalled();
            event.trigger("captured-image", _file, true);
            expect(captureSpy).toHaveBeenCalled();
            expect(s).toHaveBeenCalled();
            expect(s.mostRecentCall.args[0][0].fullPath).toEqual(_file[0]);
        });

        it("can be called without specifying args, which are unused in code", function () {
            capture.captureImage(s, e);
            expect(camera.show).toHaveBeenCalled();
            event.trigger("captured-image", _file, true);
            expect(captureSpy).toHaveBeenCalled();
            expect(s).toHaveBeenCalled();
            expect(s.mostRecentCall.args[0][0].fullPath).toEqual(_file[0]);
            expect(e).not.toHaveBeenCalled();
        });

    });
});
