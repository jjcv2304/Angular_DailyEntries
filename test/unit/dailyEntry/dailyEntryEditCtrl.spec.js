"use strict";

describe('DailyEntryEditController',function () {
    var vm, $controller, scope, $location, dailyEntry, $state, dailyEntryService, $controllerProvider, mockState,
        mockDailyEntry;

    beforeEach(module('dailyEntryApp'));

    beforeEach(inject(function(_$controller_, _$location_, $rootScope, _$state_){
        scope = $rootScope.$new();
        $controller = _$controller_;
        $state = _$state_;
        $location = _$location_;
        mockState = sinon.stub($state, 'go');
    }));

    it('should set title to New',function () {
        dailyEntry = {};
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : dailyEntry, $state : $state, dailyEntryService : dailyEntryService});
        expect(vm.title).toContain('New');
    });

    it('should set title to Edit',function () {
        dailyEntry = {dailyEntryId : 1};
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : dailyEntry,
            $state : $state, dailyEntryService : dailyEntryService});
        expect(vm.title).toContain('Edit');
    });

    it('should redirect to the list',function () {
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : dailyEntry,
            $state : $state, dailyEntryService : dailyEntryService});
        vm.cancel();
        expect(mockState.calledOnce).toBeTruthy();
    });

    it('should call dailyEntry update when submit function is called and the entry has already an id assigned ',function () {
        mockDailyEntry = sinon.stub({dailyFeelingId : 1, workoutsVM: [],$update:function () {}, $save:function () {}})
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : mockDailyEntry,
            $state : $state, dailyEntryService : dailyEntryService});
        vm.submit();
        expect(mockDailyEntry.$update.calledOnce).toBeTruthy();
    });

    it('should call dailyEntry save when submit function is called and the entry doesn´t have already an id assigned ',function () {
        mockDailyEntry = sinon.stub({dailyFeelingId : undefined, workoutsVM: [],$update:function () {},
            $save:function () {}});
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : mockDailyEntry,
            $state : $state, dailyEntryService : dailyEntryService});
        vm.submit();
        expect(mockDailyEntry.$save.calledOnce).toBeTruthy();
    });

    it('should add a workout to the workouts list when addWorkout is called ',function () {
        mockDailyEntry = sinon.stub({dailyFeelingId : 1, workoutsVM: []});
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : mockDailyEntry,
            $state : $state, dailyEntryService : dailyEntryService});
        expect(vm.dailyEntry.workoutsVM.length).toBe(0);
        vm.addWorkout({dailyFeelingId:2});
        expect(vm.dailyEntry.workoutsVM.length).toBe(1);
        expect(mockDailyEntry.workoutsVM.length).toBe(1);
    });

    it('should remove a workout from the workouts list when removeWorkout is called ',function () {
        mockDailyEntry = sinon.stub({dailyFeelingId : 1, workoutsVM: [{workoutId:1},{workoutId:2}]});
        vm = $controller('DailyEntryEditCtrl as vm', { $location: $location, $scope: scope, dailyEntry : mockDailyEntry,
            $state : $state, dailyEntryService : dailyEntryService});
        expect(vm.dailyEntry.workoutsVM.length).toBe(2);
        vm.removeWorkout(0);
        expect(vm.dailyEntry.workoutsVM.length).toBe(1);
        vm.removeWorkout(0);
        expect(vm.dailyEntry.workoutsVM.length).toBe(0);
    });

    //console.log(angular.mock.dump(vm));
});