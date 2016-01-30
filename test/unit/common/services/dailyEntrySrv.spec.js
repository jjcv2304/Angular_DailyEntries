describe('daily entry service mocking the service method',function () {

    var workoutSwimmingId = '12';
    var workoutTrekkingId = '72';

    it('should return the right name of the workout type by its id',function () {
        var dailyEntryService ={};

        angular.mock.module({
            'dailyEntryService' : {
                getWorkoutNameById: function (idStr) {
                    var id = Number(idStr);
                    if(id===12){
                        return 'Swimming';
                    }else if(id===72){
                        return 'Trekking';
                    }else {
                        return 'Other';
                        //should add entire list, but is just a proof of concept for unit testing
                    }
                }
            }
        });

        angular.mock.inject(function (_dailyEntryService_) {
            dailyEntryService = _dailyEntryService_;
        });

        expect(dailyEntryService.getWorkoutNameById(workoutSwimmingId)).toEqual('Swimming');
        expect(dailyEntryService.getWorkoutNameById(workoutTrekkingId)).toEqual('Trekking');
        expect(dailyEntryService.getWorkoutNameById(3)).toEqual('Other');
    });
});

describe('daily entry service injecting a mock service ',function () {
    var workoutSwimmingId = '1';
    var workoutTrekkingId = '7';
    var dailyEntryService = {};

    beforeEach(module('common.services'));

    beforeEach(inject(function(_dailyEntryService_) {
        dailyEntryService = _dailyEntryService_;
    }));

     it('should return the right name of the workout type by its id', function () {
        expect(dailyEntryService.getWorkoutNameById(workoutSwimmingId)).toEqual('Swimming');
        expect(dailyEntryService.getWorkoutNameById(workoutTrekkingId)).toEqual('Trekking');
    });
});