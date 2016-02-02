"use strict";

describe('Daily entry edit controller',function () {
    var $controller, scope, vm, mockDailyEntryResource, mockDailyEntry;

    beforeEach(module('dailyEntryApp'));

    beforeEach(inject(function(_$controller_, $rootScope){
        scope = $rootScope.$new();
        $controller = _$controller_;
        mockDailyEntry = sinon.stub({$remove:function(){}});
        mockDailyEntryResource = sinon.stub({get:function () {}, save:function () {}, update :function () {}})
    }));

    it('should call the delete function with one parameter',function () {
        vm = $controller('DailyEntryListCtrl as vm', { $scope: scope, dailyEntryResource: mockDailyEntryResource});

        expect(mockDailyEntryResource.get.calledOnce).toBeTruthy();
    });

    it('should set vm.dailyEntries the result of dailyEntryResource.get ',function () {
        //var dailyEntriesMock = {};
        //dailyEntryResourceMock.get.returns(dataMock);
        //
        //vm = $controller('DailyEntryListCtrl as vm', { $scope: scope, dailyEntryResource: dailyEntryResourceMock});
        //
        //expect(vm.dailyEntries).toBe({});
    });

});