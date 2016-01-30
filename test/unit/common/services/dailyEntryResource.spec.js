describe('DailyEntryResource ',function () {

    var dailyEntryResource;
    var $httpBackend;

    beforeEach(module('common.services'));

    beforeEach(inject(function(_dailyEntryResource_, _$httpBackend_){
        dailyEntryResource = _dailyEntryResource_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add entries, matching with a function',function () {

        //'{"dailyFeelingId":1,"date":"Jan 15, 2015","workout":[{"workoutId":2,"workou
        //tType":{"workoutTypeId":2,"name":"Run"},"dailyFeelingId":1}]}'
        var expectedData = function (data) {
            //dump(angular.mock.dump(data));
            return angular.fromJson(data).dailyFeelingId === 1;
        };

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var entry = new dailyEntryResource({
            "dailyFeelingId": 1,
            "date": "Jan 15, 2015",
            "workout": [{
                "workoutId": 2,
                "workoutType": {
                    "workoutTypeId": 2,
                    "name": "Run"
                },
                "dailyFeelingId": 1
            }]
        });

        entry.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should add entries',function () {
        var expectedData = {
            "dailyFeelingId": 1, "date": "Jan 15, 2015", "workout": [{"workoutId": 2, "workoutType": {"workoutTypeId": 2, "name": "Run"}, "dailyFeelingId": 1}]};

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var entry = new dailyEntryResource({
            "dailyFeelingId": 1,
            "date": "Jan 15, 2015",
            "workout": [{
                "workoutId": 2,
                "workoutType": {
                    "workoutTypeId": 2,
                    "name": "Run"
                },
                "dailyFeelingId": 1
            }]
        });

        entry.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should request right url getting entry by id',function () {
        //$httpBackend.expectGET(function (url) {
        //    dump(url);
        //    return true;
        //}).respond(200);
        //code above should show the url expected but not working

        $httpBackend.expectGET("http://localhost:8901//api/dailyEntry/1").respond(200);

        dailyEntryResource.get({dailyFeelingId : 1});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update',function () {
        $httpBackend.expectPUT('http://localhost:8901//api/dailyEntry')
            .respond(200);
        var entry = new dailyEntryResource({
            "dailyFeelingId": 1,
            "date": "Jan 15, 2015",
            "workout": [{
                "workoutId": 2,
                "workoutType": {
                    "workoutTypeId": 2,
                    "name": "Run"
                },
                "dailyFeelingId": 1
            }]
        });
        entry.$update();
        expect($httpBackend.flush).not.toThrow();
    });

});
